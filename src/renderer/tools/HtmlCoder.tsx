import * as React from 'react';
import { Form, Icon } from 'semantic-ui-react';
import utils from '../utils';

function checkEncodedChars(html: string) {
  return html.match(
    /(&nbsp)|(&iexcl)|(&cent)|(&pound)|(&curren)|(&yen)|(&brvbar)|(&sect)|(&uml)|(&copy)|(&ordf)|(&laquo)|(&not)|(&reg)|(&macr)|(&deg)|(&plusmn)|(&sup2)|(&sup3)|(&acute)|(&micro)|(&para)|(&middot)|(&cedil)|(&sup1)|(&ordm)|(&raquo)|(&frac14)|(&frac12)|(&frac34)|(&iquest)|(&Agrave)|(&Aacute)|(&Acirc)|(&Atilde)|(&Auml)|(&Aring)|(&AElig)|(&Ccedil)|(&Egrave)|(&Eacute)|(&Ecirc)|(&Euml)|(&Igrave)|(&Iacute)|(&Icirc)|(&Iuml)|(&ETH)|(&Ntilde)|(&Ograve)|(&Oacute)|(&Ocirc)|(&Otilde)|(&Ouml)|(&times)|(&Oslash)|(&Ugrave)|(&Uacute)|(&Ucirc)|(&Uuml)|(&Yacute)|(&THORN)|(&szlig)|(&agrave)|(&aacute)|(&acirc)|(&atilde)|(&auml)|(&aring)|(&aelig)|(&ccedil)|(&egrave)|(&eacute)|(&ecirc)|(&euml)|(&igrave)|(&iacute)|(&icirc)|(&iuml)|(&eth)|(&ntilde)|(&ograve)|(&oacute)|(&ocirc)|(&otilde)|(&ouml)|(&divide)|(&oslash)|(&ugrave)|(&uacute)|(&ucirc)|(&uuml)|(&yacute)|(&thorn)|(&yuml)|(&fnof)|(&Alpha)|(&Beta)|(&Gamma)|(&Delta)|(&Epsilon)|(&Zeta)|(&Eta)|(&Theta)|(&Iota)|(&Kappa)|(&Lambda)|(&Mu)|(&Nu)|(&Xi)|(&Omicron)|(&Pi)|(&Rho)|(&Sigma)|(&Tau)|(&Upsilon)|(&Phi)|(&Chi)|(&Psi)|(&Omega)|(&alpha)|(&beta)|(&gamma)|(&delta)|(&epsilon)|(&zeta)|(&eta)|(&theta)|(&iota)|(&kappa)|(&lambda)|(&mu)|(&nu)|(&xi)|(&omicron)|(&pi)|(&rho)|(&sigmaf)|(&sigma)|(&tau)|(&upsilon)|(&phi)|(&chi)|(&psi)|(&omega)|(&thetasym)|(&upsih)|(&piv)|(&bull)|(&hellip)|(&prime)|(&Prime)|(&oline)|(&frasl)|(&weierp)|(&image)|(&real)|(&trade)|(&alefsym)|(&larr)|(&uarr)|(&rarr)|(&darr)|(&harr)|(&crarr)|(&lArr)|(&uArr)|(&rArr)|(&dArr)|(&hArr)|(&forall)|(&part)|(&exist)|(&empty)|(&nabla)|(&isin)|(&notin)|(&ni)|(&prod)|(&sum)|(&minus)|(&lowast)|(&radic)|(&prop)|(&infin)|(&ang)|(&and)|(&or)|(&cap)|(&cup)|(&int)|(&there4)|(&sim)|(&cong)|(&asymp)|(&ne)|(&equiv)|(&le)|(&ge)|(&sub)|(&sup)|(&nsub)|(&sube)|(&supe)|(&oplus)|(&otimes)|(&perp)|(&sdot)|(&lceil)|(&rceil)|(&lfloor)|(&rfloor)|(&lang)|(&rang)|(&loz)|(&spades)|(&clubs)|(&hearts)|(&diams)|(&")|(&amp)|(&lt)|(&gt)|(&OElig)|(&oelig)|(&Scaron)|(&scaron)|(&Yuml)|(&circ)|(&tilde)|(&ndash)|(&mdash)|(&lsquo)|(&rsquo)|(&sbquo)|(&ldquo)|(&rdquo)|(&bdquo)|(&dagger)|(&Dagger)|(&permil)|(&lsaquo)|(&rsaquo)|(&euro)/gm
  );
}

function decode(html: string) {
  const encodedHtml = checkEncodedChars(html);
  if (encodedHtml != null) {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.innerText;
  }
  return '';
}

function encode(html: string) {
  const encodedHtml = checkEncodedChars(html);
  if (encodedHtml == null) {
    const div = document.createElement('div');
    div.innerText = html;
    return div.innerHTML;
  }
  return '';
}

export default function HtmlCoder() {
  const [rawValue, setRawValue] = React.useState('');
  const [resultValue, setResultValue] = React.useState('');

  const onEncode = () => {
    setResultValue('');
    const encoded = encode(rawValue);
    setResultValue(encoded);
  };

  const onDecode = () => {
    setResultValue('');
    const decoded = decode(rawValue);
    setResultValue(decoded);
  };

  const onReset = () => {
    setRawValue('');
    setResultValue('');
  };

  const onCopy = () => {
    utils.copy(resultValue);
  };

  return (
    <>
      <Form>
        <Form.TextArea
          rows={10}
          value={rawValue}
          label="HTML"
          onChange={(e) => setRawValue(e.currentTarget.value)}
          placeholder="Enter or paste html code here"
        />
        <Form.Group inline>
          <Form.Button primary onClick={onEncode}>
            Encode
          </Form.Button>
          <Form.Button primary onClick={onDecode}>
            Decode
          </Form.Button>
        </Form.Group>
        <Form.TextArea rows={10} value={resultValue} label="Output" />
        <Form.Group inline>
          <Form.Button onClick={onCopy}>
            <Icon name="copy" />
            Copy
          </Form.Button>
          <Form.Button onClick={onReset}>Reset</Form.Button>
        </Form.Group>
      </Form>
    </>
  );
}
