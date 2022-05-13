const templates = [
  "Actionscript",
  "Ada",
  "Agda",
  "Android",
  "AppEngine",
  "AppceleratorTitanium",
  "ArchLinuxPackages",
  "Autotools",
  "C",
  "C++",
  "CFWheels",
  "CMake",
  "CUDA",
  "CakePHP",
  "ChefCookbook",
  "Clojure",
  "CodeIgniter",
  "CommonLisp",
  "Composer",
  "Concrete5",
  "Coq",
  "CraftCMS",
  "D",
  "DM",
  "Dart",
  "Delphi",
  "Drupal",
  "EPiServer",
  "Eagle",
  "Elisp",
  "Elixir",
  "Elm",
  "Erlang",
  "ExpressionEngine",
  "ExtJs",
  "Fancy",
  "Finale",
  "ForceDotCom",
  "Fortran",
  "FuelPHP",
  "GWT",
  "GitBook",
  "Go",
  "Godot",
  "Gradle",
  "Grails",
  "Haskell",
  "IGORPro",
  "Idris",
  "JENKINS_HOME",
  "Java",
  "Jboss",
  "Jekyll",
  "Joomla",
  "Julia",
  "KiCAD",
  "Kohana",
  "Kotlin",
  "LabVIEW",
  "Laravel",
  "Leiningen",
  "LemonStand",
  "Lilypond",
  "Lithium",
  "Lua",
  "Magento",
  "Maven",
  "Mercury",
  "MetaProgrammingSystem",
  "Nim",
  "Node",
  "OCaml",
  "Objective-C",
  "Opa",
  "OracleForms",
  "Packer",
  "Perl",
  "Perl6",
  "Phalcon",
  "PlayFramework",
  "Plone",
  "Prestashop",
  "Processing",
  "PureScript",
  "Python",
  "Qooxdoo",
  "Qt",
  "R",
  "ROS",
  "Rails",
  "RhodesRhomobile",
  "Ruby",
  "Rust",
  "SCons",
  "Sass",
  "Scala",
  "Scheme",
  "Scrivener",
  "Sdcc",
  "SeamGen",
  "SketchUp",
  "Smalltalk",
  "SugarCRM",
  "Swift",
  "Symfony",
  "SymphonyCMS",
  "TeX",
  "Terraform",
  "Textpattern",
  "TurboGears2",
  "Typo3",
  "Umbraco",
  "Unity",
  "UnrealEngine",
  "VVVV",
  "VisualStudio",
  "Waf",
  "WordPress",
  "Xojo",
  "Yeoman",
  "Yii",
  "ZendFramework",
  "Zephir",
  "gcov",
  "nanoc",
  "opencart",
  "stella",
];

const backendURI = "http://127.0.0.1:5000";

// check if the user is authenticated or not
checkAuthentication();

// get gitignore templates
getTemplates();

const form = document.getElementById("create-repo-form");

// Adding a event listener for user on submit
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = form.elements["name"].value;
  const description = form.elements["description"].value;
  const homepage = form.elements["homepage"].value;
  const isPrivate = form.elements["private"].checked;
  const template = form.elements["template"].value;

  const body = {
    name: name,
    description: description,
    homepage: homepage,
    isPrivate: isPrivate,
    template: template,
    userId: localStorage.getItem("id"),
  };

  fetch(`${backendUrl}/repos`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      Accept: "application/json",
      authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      window.location.replace("/pages/home.html")
    })
    .catch((err) => {
      console.log(err.message);
    });
});

// utility function for getting gitignore templates from backend
async function getTemplates() {
  templates.map((template) => {
    document.getElementById(
      "templates"
    ).innerHTML += `<option value="${template}" ></option>`;
  });
}

// utility function for checking if the user is authenticated or not
function checkAuthentication() {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) window.location.replace("/index.html");
}
