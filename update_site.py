import os
import re

def update_site():
    base_dir = "d:/New folder"
    
    index_path = os.path.join(base_dir, "index.html")
    with open(index_path, 'r', encoding='utf-8') as f:
        index_content = f.read()
    
    index_content = re.sub(r'src="bhusanchar\s+logo\.png"', 'src="logo.png"', index_content)
    index_content = re.sub(r'src="bhu\s+logo\.png"', 'src="logo.png"', index_content)
    
    header_pattern = re.compile(r'(<div class="topbar">.*?</nav>)', re.DOTALL)
    header_match = header_pattern.search(index_content)
    if not header_match:
        print("Could not find header in index.html")
        return
    std_header = header_match.group(1)
    
    footer_pattern = re.compile(r'(<footer class="site-footer">.*?</footer>)', re.DOTALL)
    footer_match = footer_pattern.search(index_content)
    if not footer_match:
        print("Could not find footer in index.html")
        return
    std_footer = footer_match.group(1)
    
    with open(index_path, 'w', encoding='utf-8') as f:
        f.write(index_content)
    print("Updated index.html")

    for filename in os.listdir(base_dir):
        if not filename.endswith('.html') or filename == 'index.html':
            continue
            
        filepath = os.path.join(base_dir, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        if filename == 'admin.html':
            content = re.sub(r'src="bhusanchar\s+logo\.png"', 'src="logo.png"', content)
            content = re.sub(r'src="bhu\s+logo\.png"', 'src="logo.png"', content)
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Updated {filename}")
            continue
            
        custom_header = re.sub(r'nav-link\s+active', 'nav-link', std_header)
        custom_header = re.sub(rf'(class="nav-link")(\s+href="{filename}")', r'\1 active\2', custom_header)
        
        content = re.sub(r'<div class="topbar">.*?</nav>', custom_header, content, flags=re.DOTALL)
        content = re.sub(r'<footer class="site-footer">.*?</footer>', std_footer, content, flags=re.DOTALL)
        
        content = re.sub(r'src="bhusanchar\s+logo\.png"', 'src="logo.png"', content)
        content = re.sub(r'src="bhu\s+logo\.png"', 'src="logo.png"', content)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filename}")

if __name__ == "__main__":
    update_site()
