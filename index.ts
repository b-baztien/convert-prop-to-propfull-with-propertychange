var text = `  public string PNAME { get; set; }
            public string NAME { get; set; }
            public string SNAME { get; set; }
            public string IDNO { get; set; }
            public string BIRTHDATE { get; set; }
            public string FANAME { get; set; }
            public string MATHERNAME { get; set; }
            public string NATION { get; set; }
            public string RACE { get; set; }
            public string ADDRESS { get; set; }
            public string RECEIPTNO { get; set; }
            public string RECEIPTORDER { get; set; }
            public DateTime RECEIPTDATE { get; set; }
            public string AMOUNT { get; set; }
            public string INQDEPART { get; set; }
            public string INQDOCDATE { get; set; }
            public string INQDOCNO { get; set; }
            public string RECID { get; set; }
            public string POSITION { get; set; }
            public string FULLNAME { get; set; }
            public string INQPOSITION { get; set; }
            public string INQNAME { get; set; }
            public string INQREASON { get; set; }
            public string USERUPDATE { get; set; }
            public string FEE_BOOK_ID { get; set; }
            public string RECEIPT_ORDER { get; set; }
            public string RECEIPT_NO { get; set; }`;

function changeToPropFull(text: string) {
  let value = text
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
