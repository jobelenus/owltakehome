const form = document.getElementById('tax_form');
form.addEventListener('submit', async function (evt) {
  evt.preventDefault();
  let state = document.getElementById('state').value;
  let amount = document.getElementById('amount').value;

  try {
    amount = parseInt(amount);
    if (!amount) throw Error;
  } catch(e) {
    alert('Please enter a positive integer amount');
    return false;
  }

  let resp = fetch('/tax/' + state + '/?amount=' + amount, {method: 'GET'}).then((resp) => resp.json());
  resp.then((rate) => {
    if (!'rate' in Object.keys(rate)) {
      alert('We had a problem finding your rate!');
      return;
    }

    let container = document.getElementsByClassName('message-list')[0];
    let response_display = document.getElementById('response_template');
    let doc = new DOMParser().parseFromString(response_display.innerHTML, "text/html");
    let display_text = rate.rate ? 'For $' + new Intl.NumberFormat('en-US').format(rate.amount) + ' the rate in ' + rate.state + ' is ' + rate.rate : 'Congrats, there is no tax for ' + rate.state + '!';
    doc.querySelector('p.display').innerText = display_text;
    container.insertBefore(doc.querySelector('section'), container.firstChild);
  }).catch((error) => {
    alert('Problem! ' + error);
  }) 
  return false;
})