from __future__ import annotations
from ooodev.loader import Lo

def main():
    doc = Lo.current_doc
    doc.msgbox('Hello, world!')

if __name__ == '__main__':
    main()
