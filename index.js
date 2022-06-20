const userName = document.getElementById("name");
const submitBtn = document.getElementById("submitBtn");

const { PDFDocument, rgb, degrees } = PDFLib;
const capitalize = (str, lower = false) =>
    (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, (match) =>
        match.toUpperCase()
    );

// ===================================
// taking data from text file
const arr = []
const openFile = (e) => {

    const reader = new FileReader(); // filereader
    reader.readAsText(e.target.files[0]); // read as text
    reader.onload = () => {
        const text = reader.result;
        const result = text.split(/\r?\n/); // split on every new line
        console.log(result); // do something with array
        for (let i = 0; i < result.length; i++) {
            // console.log(result[i])
            arr.push(result[i])
        }
        console.log(arr.length)
        for (let j = 0; j < arr.length; j++) {
            console.log(arr[j])
        }
    };

};
// =====================================
submitBtn.addEventListener("click", () => {
    const val = capitalize(userName.value);

    //check if the text is empty or not
    if (val.trim() !== "" && userName.checkValidity()) {
        // console.log(val);
        generatePDF(val);
    } else {
        userName.reportValidity();
    }
    userName.value = ""
});


// ===========================================

const gen = document.getElementById("Gen")
gen.addEventListener("click", function () {




    //---------------------------------------------------------------
    // const arr = ["Aditya R", "Aman Singh", "Anand Kumar", "Arin Tripathi", "B M Byresh", "Balaji G V", "Bharath Gowda A", "Bhavana S", "Bhavish Satbir Singh", "Bhumika Rajpurohit", "C Lavanya", "Christine Nivedha", "Venkatesh T","D K Prema"]
    console.log(arr.length)
    let input = document.getElementById("name")
    // let submitBtn = document.getElementById("submit")
    // Adding input 1 by 1 function
    const sleep = (time) => {
        return new Promise((resolve) => setTimeout(resolve, time))
    }

    const doSomething = async () => {
        for (let i = 0; i < arr.length; i++) {
            await sleep(100)
            // console.log(i)
            input.value = arr[i]
            // *************
            const val = capitalize(userName.value);

            if (val.trim() !== "" && userName.checkValidity()) {
                // console.log(val);
                generatePDF(val);
            } else {
                userName.reportValidity();
            }
            // *************
            // if (input.value != null) {
            //     alert("Hi")

            // }
        }
        input.value = ""
    }
    doSomething()
    // ------------------------------------------------------

    // submit button





})
const generatePDF = async (name) => {
    const existingPdfBytes = await fetch("./certificate1.pdf").then((res) =>
        res.arrayBuffer()
    );

    // Load a PDFDocument from the existing PDF bytes
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    pdfDoc.registerFontkit(fontkit);

    //get font
    const fontBytes = await fetch("./Sacramento-Regular.ttf").then((res) =>
        res.arrayBuffer()
    );

    // Embed our custom font in the document
    const Sacramento = await pdfDoc.embedFont(fontBytes);

    // Get the first page of the document
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    // Draw a string of text diagonally across the first page
    firstPage.drawText(name, {
        x: 300,
        y: 300,
        size: 58,
        font: Sacramento,
        color: rgb(0, 0, 0),
    });

    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save();
    console.log("Done creating");

    // this was for creating uri and showing in iframe

    // const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
    // document.getElementById("pdf").src = pdfDataUri;

    var file = new File(
        [pdfBytes],
        "Certificate.pdf",
        {
            type: "application/pdf;charset=utf-8",
        }
    );
    saveAs(file);
};



