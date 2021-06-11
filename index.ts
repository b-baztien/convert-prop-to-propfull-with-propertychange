var text = `public string RECV_DEPT_OTH_ID { get; set; }
        public string NAME { get; set; }`;

function changeToPropFull(text: string) {
  let value = text
    .trim()
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .split(' ')
    .filter(item => !item.includes('public'))
    .filter(item => !item.includes('{'))
    .filter(item => !item.includes('get;'))
    .filter(item => !item.includes('set;'))
    .filter(item => !item.includes('}'));

  let typeValue = '';
  let name = '';
  let requiredField = '';

  for (var item in value) {
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
