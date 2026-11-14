const fs = require('fs');
const path = require('path');

const dir = 'd:/New folder';

// 1. Rename the file
const oldPath = path.join(dir, 'gallery.html');
const newPath = path.join(dir, 'resource.html');
if (fs.existsSync(oldPath)) {
    fs.renameSync(oldPath, newPath);
    console.log('Renamed gallery.html to resource.html');
}

// 2. Update all HTML files
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace href links
    content = content.replace(/href="gallery\.html"/g, 'href="resource.html"');
    
    // Replace text "Gallery" with "Resource" - but specifically targeting navbar/footer links
    // >Gallery< or >Gallery 
    content = content.replace(/>\s*Gallery\s*</g, '>Resource<');
    
    // For active class in the script itself if we ran it on resource.html
    // but the regex will just match nav-link or dropdown-item for resource.html.
    
    fs.writeFileSync(filePath, content, 'utf8');
});
console.log('Updated all HTML files.');

// 3. Update the update-about-dropdown.js script so it has the right template
const scriptPath = path.join(dir, 'update-about-dropdown.js');
if (fs.existsSync(scriptPath)) {
    let scriptContent = fs.readFileSync(scriptPath, 'utf8');
    scriptContent = scriptContent.replace(/gallery\.html/g, 'resource.html');
    scriptContent = scriptContent.replace(/>Gallery</g, '>Resource<');
    fs.writeFileSync(scriptPath, scriptContent, 'utf8');
    console.log('Updated update-about-dropdown.js');
}

// Also update update-dropdown.js and update-partner-dropdown.js
const otherScripts = ['update-dropdown.js', 'update-partner-dropdown.js'];
otherScripts.forEach(script => {
    const sPath = path.join(dir, script);
    if (fs.existsSync(sPath)) {
        let c = fs.readFileSync(sPath, 'utf8');
        c = c.replace(/gallery\.html/g, 'resource.html');
        c = c.replace(/>Gallery</g, '>Resource<');
        fs.writeFileSync(sPath, c, 'utf8');
        console.log('Updated ' + script);
    }
});

