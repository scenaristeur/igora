
## extension 'Include Python Path for LibreOffice'
- https://extensions.libreoffice.org/en/extensions/show/41996
- windows https://github.com/Amourspirit/libreoffice-python-path-ext/tree/main#readme
- linux https://python-ooo-dev-tools.readthedocs.io/en/main/guide/virtual_env/linux_linking_paths.html


### APSO extension
- managing python scripts in Libreoffice https://extensions.libreoffice.org/en/extensions/show/apso-alternative-script-organizer-for-python



```
cd igora/clients/libreoffice/24.2.1/llm/
python3 -m venv venv
source venv/bin/activate
pip install ooo-dev-tools
```

### Linking to Libreoffice
- follow this paragraph https://python-ooo-dev-tools.readthedocs.io/en/main/guide/virtual_env/linux_linking_paths.html#linking-to-libreoffice
adding this two folders :
 `~/dev/igora/clients/libreoffice/24.2.1/llm`
  and `~/dev/igora/clients/libreoffice/24.2.1/llm/venv/lib/python3.10/site-packages`

- run this command to link macros to libreoffice (this is where your macro should be stored) : 
```
mkdir -p ~/.config/libreoffice/4/user/Scripts/python/llm
ln -s ~/dev/igora/clients/libreoffice/24.2.1/llm/macros ~/.config/libreoffice/4/user/Scripts/python/llm
```

verify link with 
```
cd ~/.config/libreoffice/4/user/Scripts/python/llm$
ll
```

- then you should be able to find "llm" macros in Libreoffice `Tools -> Macros -> Run Macro..`

run macros in llm/macros/say_hello in order : 
- ecrire salut
- llm_config
- llmHttpClient

You can add icons in toolbar in view /toolbar /customize, choose macros in category, drag the three macros to the right and and nice icons

libreoffice developper doc `pip install lo-dev-search`