function generatePDF() {
    const element = document.getElementById("hero");
    
    html2pdf()
    .from(element)
    .save();
}