/* =========================================
   MGM STUDENT DIGITAL ID GENERATOR
   PART 1 - LIVE PREVIEW
========================================= */

// ===== Form Fields =====

const nameInput = document.getElementById("name");
const rollInput = document.getElementById("roll");
const departmentInput = document.getElementById("department");
const dobInput = document.getElementById("dob");
const bloodInput = document.getElementById("blood");
const abcInput = document.getElementById("abc");
const emailInput = document.getElementById("email");
const addressInput = document.getElementById("address");
const emergencyInput = document.getElementById("emergency");
const validInput = document.getElementById("valid");
const photoInput = document.getElementById("photo");

// ===== Preview Fields =====

const previewName = document.getElementById("preview-name");
const previewRoll = document.getElementById("preview-roll");
const previewDepartment = document.getElementById("preview-department");
const previewDob = document.getElementById("preview-dob");
const previewBlood = document.getElementById("preview-blood");
const previewABC = document.getElementById("preview-abc");
const previewEmail = document.getElementById("preview-email");
const previewAddress = document.getElementById("preview-address");
const previewEmergency = document.getElementById("preview-emergency");
const previewValid = document.getElementById("preview-valid");

const previewPhoto = document.getElementById("preview-photo");

// ===== Generate Button =====

document
.getElementById("generate-btn")
.addEventListener("click", generateCard);

// ===== Generate Card =====

function generateCard(){

    previewName.textContent =
        nameInput.value || "YOUR NAME";

    previewRoll.textContent =
        rollInput.value || "1250427";

    previewDepartment.textContent =
        departmentInput.value;

    previewBlood.textContent =
        bloodInput.value;

    previewABC.textContent =
        abcInput.value || "0000-0000-0000";

    previewEmail.textContent =
        emailInput.value || "example@email.com";

    previewAddress.textContent =
        addressInput.value || "Your Address";

    previewEmergency.textContent =
        emergencyInput.value || "+91 XXXXXXXXXX";

    previewValid.textContent =
        validInput.value || "2026-2027";

    // Date Format

    if(dobInput.value){

        const date = new Date(dobInput.value);

        previewDob.textContent =
            date.toLocaleDateString("en-GB");

    }else{

        previewDob.textContent = "01/01/2000";

    }

}

// ===== Photo Upload =====

photoInput.addEventListener("change", function(){

    const file = this.files[0];

    if(!file) return;

    const reader = new FileReader();

    reader.onload = function(e){

        previewPhoto.src = e.target.result;

    }

    reader.readAsDataURL(file);

});
/* =========================================
   PART 2 - BARCODE + DOWNLOAD + VALIDATION
========================================= */

// ===== Barcode Function =====

function generateBarcode() {

    const roll = rollInput.value.trim() || "1250427";
    const abc = abcInput.value.trim().replace(/-/g, "");

    // Create Unique Barcode Value
    const barcodeValue = abc ? roll + abc.slice(-4) : roll;

    JsBarcode("#barcode", barcodeValue, {
        format: "CODE128",
        lineColor: "#000",
        width: 1.5,
        height: 42,
        displayValue: false,
        margin: 0
    });

    document.getElementById("barcode-number").textContent = barcodeValue;
}


// ===== Generate Button =====

document.getElementById("generate-btn").addEventListener("click", () => {

    if (nameInput.value.trim() === "") {
        alert("Please Enter Student Name");
        nameInput.focus();
        return;
    }

    if (rollInput.value.trim() === "") {
        alert("Please Enter Roll Number");
        rollInput.focus();
        return;
    }

    generateCard();
    generateBarcode();

    alert("Student ID Generated Successfully!");

});


// ===== Download Front + Back =====


document.getElementById("download-btn").addEventListener("click", downloadPDF);

async function downloadPDF() {

    await document.fonts.ready;
    await new Promise(resolve => setTimeout(resolve, 500));

    const { jsPDF } = window.jspdf;

    const front = document.getElementById("id-card-front");
    const back = document.getElementById("id-card-back");

    const frontCanvas = await html2canvas(front,{
        scale:4,
        useCORS:true,
        backgroundColor:"#ffffff"
    });

    const backCanvas = await html2canvas(back,{
        scale:4,
        useCORS:true,
        backgroundColor:"#ffffff"
    });

    const frontImg = frontCanvas.toDataURL("image/png");
    const backImg = backCanvas.toDataURL("image/png");

    const pdf = new jsPDF({
        orientation:"portrait",
        unit:"mm",
        format:"a4"
    });

    // ---------- PAGE 1 ----------
  pdf.setDrawColor(200, 200, 200);
pdf.setLineWidth(0.5);

pdf.roundedRect(
    54,
    9,
    102,
    158,
    3,
    3
);


    pdf.addImage(frontImg, "PNG", 55, 10, 100, 156);

    // ---------- PAGE 2 ----------
    pdf.addPage();
pdf.setDrawColor(200, 200, 200);
pdf.setLineWidth(0.5);

pdf.roundedRect(
    54,
    9,
    102,
    158,
    3,
    3
);
    pdf.addImage(backImg, "PNG", 55, 10, 100, 156);

    pdf.save((rollInput.value || "Student") + "_ID_Card.pdf");
}

  



// ===== Default Barcode on Page Load =====

window.addEventListener("load", () => {

    generateBarcode();

});