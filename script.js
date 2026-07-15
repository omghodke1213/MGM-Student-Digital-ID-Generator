// =========================================
// MGM Student Digital ID Generator
// =========================================

// ---------- Input Fields ----------

const nameInput = document.getElementById("name");
const rollInput = document.getElementById("roll");
const departmentInput = document.getElementById("department");
const dobInput = document.getElementById("dob");
const bloodInput = document.getElementById("blood");
const emailInput = document.getElementById("email");
const abcInput = document.getElementById("abc");
const photoInput = document.getElementById("photo");

// ---------- Preview ----------

const previewName = document.getElementById("preview-name");
const previewRoll = document.getElementById("preview-roll");
const previewDepartment = document.getElementById("preview-department");
const previewDob = document.getElementById("preview-dob");
const previewBlood = document.getElementById("preview-blood");
const previewEmail = document.getElementById("preview-email");
const previewABC = document.getElementById("preview-abc");
const previewPhoto = document.getElementById("preview-photo");

// ---------- Buttons ----------

const generateBtn = document.getElementById("generate-btn");
const downloadBtn = document.getElementById("download-btn");

// =========================================
// Generate ID
// =========================================

generateBtn.addEventListener("click", function () {

    // Name
    previewName.textContent =
        nameInput.value.trim() || "YOUR NAME";

    // Roll Number
    previewRoll.textContent =
        rollInput.value.trim() || "-------";

    // Department
    previewDepartment.textContent =
        departmentInput.value;

    // DOB
    if(dobInput.value){

        const date = new Date(dobInput.value);

        const options = {
            day:'2-digit',
            month:'short',
            year:'numeric'
        };

        previewDob.textContent =
        date.toLocaleDateString('en-GB',options);

    }
    else{

        previewDob.textContent="--/--/----";

    }

    // Blood Group
    previewBlood.textContent =
        bloodInput.value;

    // Email
    previewEmail.textContent =
        emailInput.value.trim() || "your@email.com";

    // ABC ID
    previewABC.textContent =
        abcInput.value.trim() || "0000-0000-0000";

});

// =========================================
// Photo Upload
// =========================================

photoInput.addEventListener("change", function(){

    const file=this.files[0];

    if(file){

        const reader=new FileReader();

        reader.onload=function(e){

            previewPhoto.src=e.target.result;

        };

        reader.readAsDataURL(file);

    }

});

// =========================================
// Download ID Card
// =========================================

downloadBtn.addEventListener("click",function(){

    const card=document.querySelector(".id-card");

    html2canvas(card,{
        scale:3,
        useCORS:true
    }).then(function(canvas){

        const link=document.createElement("a");

        link.download="MGM_Student_ID.png";

        link.href=canvas.toDataURL("image/png");

        link.click();

    });

});