var text = `public string LOCREC { get; set; }
            public string FLAGFNC { get; set; }
            public string RANK { get; set; }
            public string NAME { get; set; }
            public string POSITION1 { get; set; }
            public string POSITION2 { get; set; }
            public string DEPTNAME { get; set; }
            public string TELNO { get; set; }
            public string FLAG { get; set; }
            public string ITEMNO { get; set; }
            public string DEPTCODE { get; set; }
            public string RANK_FULL { get; set; }
            public string POSITION1_FULL { get; set; }
            public string POSITION2_FULL { get; set; }`;

function changeToPropFull(text: string) {
  let value = text
    .trim()
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('public ', '')
    .split('{ get; set; }')
    .map(item => item.trim());

  let typeValue = '';
  let name = '';
  let requiredField = '';

  for (var item in value) {
    typeValue = value[item].split(' ')[0];
    name = value[item].split(' ')[1];

    if (value[item] !== '') {
      if (
        value[item].includes('[') ||
        value[item].includes('=') ||
        value[item].includes(']')
      ) {
        requiredField += value[item];
      } else if (typeValue == '') {
        typeValue = value[item];
      } else if (name == '') {
        name = value[item];
      }

      if (name != '') {
        const propFullText =
          `<p>private ${typeValue} _${name};<br>` +
          (requiredField.trim() == '' ? '' : requiredField + '<br>') +
          `public ${typeValue} ${name}<br> {<br> get { return _${name}; }<br>set<br>{<br>_${name} = value;<br>OnPropertyChanged(nameof(${name}));<br>}<br>}<br></p>`;

        document.getElementById('app').innerHTML += propFullText;

        typeValue = '';
        name = '';
        requiredField = '';
      }
    }
  }
}

changeToPropFull(text);
