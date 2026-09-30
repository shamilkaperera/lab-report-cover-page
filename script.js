// Generate Cover Page
function generateCover() {
    // Get form values
    const title = document.getElementById('title').value.trim();
    const name = document.getElementById('name').value.trim();
    const regNumber = document.getElementById('regNumber').value.trim();
    const groupNumber = document.getElementById('groupNumber').value.trim();
    const semester = document.getElementById('semester').value.trim();
    const dateInput = document.getElementById('date').value;
    
    // Validate
    if (!title || !name || !regNumber || !groupNumber || !semester || !dateInput) {
        alert('Please fill in all fields!');
        return;
    }
    
    // Format date
    const date = new Date(dateInput);
    const formattedDate = date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });
    
    // Update preview
    document.getElementById('previewTitle').textContent = title.toUpperCase();
    document.getElementById('previewName').textContent = name.toUpperCase();
    document.getElementById('previewRegNumber').textContent = regNumber.toUpperCase();
    document.getElementById('previewGroupNumber').textContent = groupNumber.toUpperCase();
    document.getElementById('previewSemester').textContent = semester.toUpperCase();
    document.getElementById('previewDate').textContent = formattedDate.toUpperCase();
    
    // Show preview section
    document.getElementById('previewSection').classList.add('active');
    
    // Enable print button
    document.getElementById('printBtn').disabled = false;
    
    // Scroll to preview
    document.getElementById('previewSection').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Print/Save as PDF
function printCover() {
    window.print();
}

// Set today's date as default
document.addEventListener('DOMContentLoaded', function() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date').value = today;
});

// Allow Enter key to generate
document.getElementById('coverForm').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        generateCover();
    }
});
