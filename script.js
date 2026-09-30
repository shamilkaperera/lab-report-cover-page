// Set today's date as default
document.addEventListener('DOMContentLoaded', () => {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date').value = today;
    updatePreview();
});

// Listen to all inputs for real-time preview
const inputs = document.querySelectorAll('input');
inputs.forEach(input => {
    input.addEventListener('input', updatePreview);
});

function updatePreview() {
    // Get values
    const courseCode = document.getElementById('courseCode').value.trim();
    const title = document.getElementById('title').value.trim() || 'TITLE OF EXPERIMENT';
    const name = document.getElementById('name').value.trim() || 'NAME';
    const regNumber = document.getElementById('regNumber').value.trim() || 'REG. NO.';
    const groupNumber = document.getElementById('groupNumber').value.trim() || 'GROUP NO.';
    const semester = document.getElementById('semester').value.trim() || 'SEMESTER';
    const dateValue = document.getElementById('date').value;

    // Format Date to DD/MM/YYYY (Numbers only, no month names)
    let formattedDate = 'DATE';
    if (dateValue) {
        const date = new Date(dateValue);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        formattedDate = `${day}/${month}/${year}`;
    }

    // Update DOM (All uppercase to match academic style)
    document.getElementById('outCourseCode').textContent = courseCode.toUpperCase();
    document.getElementById('outCourseCode').parentElement.style.display = courseCode ? 'block' : 'none';
    
    document.getElementById('outTitle').textContent = title.toUpperCase();
    document.getElementById('outName').textContent = name.toUpperCase();
    document.getElementById('outRegNumber').textContent = regNumber.toUpperCase();
    document.getElementById('outGroupNumber').textContent = groupNumber.toUpperCase();
    document.getElementById('outSemester').textContent = semester.toUpperCase();
    document.getElementById('outDate').textContent = formattedDate;
}

// Download as exact A4 PDF
function downloadPDF() {
    const element = document.getElementById('coverPage');
    const name = document.getElementById('name').value.trim().replace(/[^a-zA-Z0-9]/g, '_') || 'Student';
    const title = document.getElementById('title').value.trim().replace(/[^a-zA-Z0-9]/g, '_') || 'CoverPage';

    const opt = {
        margin: 0,
        filename: `${name}_${title}_CoverPage.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
            scale: 2, // High resolution for crisp text
            useCORS: true,
            letterRendering: true
        },
        jsPDF: { 
            unit: 'mm', 
            format: 'a4', 
            orientation: 'portrait' 
        }
    };

    // Show loading state
    const btn = document.querySelector('.btn-download');
    const originalText = btn.textContent;
    btn.textContent = 'Generating PDF...';
    btn.disabled = true;

    html2pdf().set(opt).from(element).save().then(() => {
        btn.textContent = originalText;
        btn.disabled = false;
    });
}
