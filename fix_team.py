import re

# Fix equipe.html labels
path_html = r'c:\Users\ddom1\QuantEcon\QuantEcon\equipe.html'
with open(path_html, 'r', encoding='utf-8') as f:
    html_text = f.read()

# Replace VOLUNTÁRIO with MEMBRO
html_text = re.sub(r'VOLUNTÁRIO', 'MEMBRO', html_text)
html_text = re.sub(r'Voluntários', 'Membros', html_text)

with open(path_html, 'w', encoding='utf-8') as f:
    f.write(html_text)

# Fix script.js translation
path_js = r'c:\Users\ddom1\QuantEcon\QuantEcon\static\js\script.js'
with open(path_js, 'r', encoding='utf-8') as f:
    js_text = f.read()

js_text = js_text.replace('"team.volunteers": "Voluntários"', '"team.volunteers": "Membros"')
js_text = js_text.replace('"team.volunteers": "Volunteers"', '"team.volunteers": "Members"')

with open(path_js, 'w', encoding='utf-8') as f:
    f.write(js_text)

# Add explicit styling for #load-more-btn to styles.css to override any weird light-theme conflicts
path_css = r'c:\Users\ddom1\QuantEcon\QuantEcon\static\css\styles.css'
with open(path_css, 'r', encoding='utf-8') as f:
    css_text = f.read()

# Add CSS rules at the end of the file
css_text += "\n\n/* Fix for load more button in light theme */\n#load-more-btn {\n  background-color: var(--primary-color) !important;\n  color: #ffffff !important;\n  border: 2px solid var(--primary-color) !important;\n  appearance: none;\n  -webkit-appearance: none;\n  border-radius: 50px;\n  padding: 18px 40px;\n  font-weight: 700;\n  font-size: 1.1rem;\n  cursor: pointer;\n  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);\n  transition: all 0.3s ease;\n}\n\n#load-more-btn:hover {\n  background-color: var(--hover-color) !important;\n  border-color: var(--hover-color) !important;\n  transform: translateY(-3px);\n  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);\n}\n"

with open(path_css, 'w', encoding='utf-8') as f:
    f.write(css_text)

print("Modificacoes aplicadas com sucesso.")
