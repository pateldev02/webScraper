const db = require("../model");
const Emp = db.emps;
const Data = db.data;

const cron = require("node-cron");
const cheerio = require("cheerio");

const request = require("request");

const bcrypt = require("bcrypt"); // Password Hashing

const XLSX = require("xlsx"); // For store data in excel file

// Display URL-Password form
const Index = async (req, res) => {
  res.render("index.ejs");
};

// Display Admin Login form
const Login = async (req, res) => {
  res.render("login.ejs");
};

// Display Admin Side form
const Admin_Side = async (req, res) => {
  res.render("admin_side.ejs");
};

// Display New Registration form
const Registration = async (req, res) => {
  res.render("registration.ejs");
};

// 1. Create New emp with Hashing the password
const addEmp = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  let info = {
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    mobile_no: req.body.mobile_no,
    password: await bcrypt.hash(req.body.password, salt),
  };
  const emp = await Emp.create(info);
  res.redirect("/admin_side");
};

// 2. Login Validation
const A_Login = async (req, res) => {
  let emp = await Emp.findOne({ where: { name: req.body.name } });
  if (emp == null) {
    return res.send("invalid user!");
  } else {
    const isValid = await bcrypt.compare(req.body.password, emp.password);
    if (isValid) {
      res.redirect("/admin_side");
    } else {
      res.send("invalid password!");
    }
  }
};

// 3. Data Scrapping.
var urll = "";

const S_Data = async (req, res) => {
  // URL parsing
  urll = req.body.url;
  console.log(urll);
  res.redirect("/");
};

cron.schedule(" */5 * * * * *", () => {
  // Execution every 5 sec

  request(urll, (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);

      const data1 = $("#modelPrice").text();
      const data = $(".ns-val").text();
      const data2 = data.split("\n\n\n"); // data Split

      const one = data2[0];
      const two = data2[1];
      const three = data2[2];
      const four = data2[3];

      console.log(data1);
      console.log(one);
      console.log(two);
      console.log(three);
      console.log(four);

      const dataa = Data.create({
        Price: data1,
        Engine: one,
        Emission_Type: two,
        Max_Power: three,
        ABS: four,
      }); // Add data in Db.

      // create json format
      const scrappingData = [
        {
          Price: data1,
          Engine: one,
          Emission_Type: two,
          Max_Power: three,
          ABS: four,
        },
      ];

      // Store Data in excel file
      const convertExcel = () => {
        const workSheet = XLSX.utils.json_to_sheet(scrappingData); // Create worksheet by utils function of xlsx (take a json and convert into sheet)
        const workBook = XLSX.utils.book_new(); // Create fresh workbook

        XLSX.utils.book_append_sheet(workBook, workSheet, "scrapedData"); // Combine book and sheet

        // Generate buffer if we have a large amount of Data
        XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });

        // Convert workbook data into Binary string
        XLSX.write(workBook, { bookType: "xlsx", type: "binary" });

        // Download the xlsx file
        // XLSX.writeFile(workBook,"scrapedData.xlsx")
      };
      convertExcel();
    }
  });
});

//4. Show total Scrapping data on server.
const Data2 = async (req, res) => {
  const sql = await Data.findAll().then(function (user) {
    res.render("data.ejs", {
      user: user,
    });
  });
};

// 5. Show total registration data on server.
const Data3 = async (req, res) => {
  const sql = await Emp.findAll().then(function (user) {
    res.render("a_data.ejs", {
      user: user,
    });
  });
};

// 6. delete Data by ID
const deleteData = async (req, res) => {
  let id = req.params.id;
  await Data.destroy({ where: { id: id } });
  res.redirect("/data");
};

// 7. delete Emp by ID
const deleteEmp = async (req, res) => {
  let id = req.params.id;
  await Emp.destroy({ where: { id: id } });
  res.redirect("/data3");
};

// 8. Find all the Data by id.
const fEmp = async (req, res) => {
  const sql = await Emp.findOne({ where: { id: req.params.id } }).then(
    function (user) {
      res.render("update.ejs", {
        user: user,
      });
    }
  );
};

// 9. update emp
const updateEmp = async (req, res) => {
  // const data = await Emp.findOne({ where: { id:req.params.id }})

  let info = {
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    mobile_no: req.body.mobile_no,
  };

  console.log(info);

  // const{name,email,gender,mobile_no} = req.body;
  // const emp = await Emp.create({name,email,gender,mobile_no}, { where: { id:req.params.id }})
  // console.log(Emp);
  // res.redirect('/data3')

  // res.redirect('/r_data');
};

module.exports = {
  Index,
  Login,
  A_Login,
  Admin_Side,
  Registration,
  addEmp,
  S_Data,
  Data2,
  Data3,
  deleteData,
  deleteEmp,
  fEmp,
  updateEmp,
  //Logout
};
