#!/usr/bin/env python3
"""Auto-generate past-papers-data.js by scanning past-papers/ directory."""
import json, os, re

os.chdir(r'C:\ProgramData\WorkBuddy\chromium-env\6k03by\WorkBuddy\2026-06-09-12-23-40\charles1ding.github.io')

DATA = {}
paper_dir = 'past-papers'

for fn in sorted(os.listdir(paper_dir)):
    if not fn.endswith('.pdf'): continue
    # Parse: 0620_Chemistry_June_2022_Mark_Scheme_21.pdf
    # or: 0620_Chemistry_March_2022_Question_paper_22.pdf
    name = fn.replace('.pdf', '')
    parts = name.split('_')
    # parts: ['0620','Chemistry','June','2022','Mark','Scheme','21']
    # or:    ['0620','Chemistry','March','2026','Question','Paper','22']
    
    season = parts[2]   # June/March/November
    year   = parts[3]   # 2022-2026
    
    # Find type: Mark Scheme or Question Paper
    if 'Mark' in parts:
        mtype = 'Mark Scheme'
    elif 'Question' in parts:
        mtype = 'Question Paper'
    else:
        continue
    
    paper = parts[-1].lstrip('0') or '0'  # '21' -> '21'
    if paper == '0': paper = parts[-1]
    
    # Build label
    paper_num = int(paper)
    if 21 <= paper_num <= 23:
        subtype = 'Multiple Choice' if paper_num != 23 else 'Multiple Choice (Extended)'
        core = ' (Core)' if paper_num == 21 else ' (Extended)'
    elif 41 <= paper_num <= 43:
        subtype = 'Theory'
        core = ' (Extended)'
    elif paper_num == 32:
        subtype = 'Theory'
        core = ' (Core)'
    elif 61 <= paper_num <= 63:
        subtype = 'Alt. to Practical'
        core = ''
    else:
        subtype = 'Paper'
        core = ''
    
    label = f'Paper {paper} - {subtype}{core}'
    
    DATA.setdefault(year, {}).setdefault(season, {}).setdefault(mtype, []).append({
        'file': fn, 'paper': paper, 'label': label
    })

print(f'Generated {sum(len(DATA[y].get(s,{}).get(t,[])) for y in DATA for s in DATA[y] for t in DATA[y][s])} entries across {len(DATA)} years')

js = 'const DATA = ' + json.dumps(DATA, indent=2, ensure_ascii=False) + ';\n'
with open('past-papers-data.js', 'w', encoding='utf-8') as f:
    f.write(js)
print('past-papers-data.js written')
