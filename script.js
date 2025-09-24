const textInput = document.getElementById('text');
const sizeSlider = document.getElementById('size');
const sizeValue = document.getElementById('size-value');
const fgColorInput = document.getElementById('fg-color');
const bgColorInput = document.getElementById('bg-color');
const generateBtn = document.getElementById('generate');
const qrcodeContainer = document.getElementById('qrcode');
const downloadLink = document.getElementById('download');
const copyLinkBtn = document.getElementById('copy-link');

let currentQRCode = null;

sizeSlider.addEventListener('input', () => {
  sizeValue.textContent = `${sizeSlider.value}×${sizeSlider.value}`;
});

generateBtn.addEventListener('click', generateQR);

textInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
    generateQR();
  }
});

function generateQR() {
  const text = textInput.value.trim();
  if (!text) return;

  qrcodeContainer.innerHTML = '';
  downloadLink.style.display = 'none';
  copyLinkBtn.style.display = 'none';

  const size = parseInt(sizeSlider.value);
  const fgColor = fgColorInput.value;
  const bgColor = bgColorInput.value;

  currentQRCode = new QRCode(qrcodeContainer, {
    text: text,
    width: size,
    height: size,
    colorDark: fgColor,
    colorLight: bgColor,
    correctLevel: QRCode.CorrectLevel.H
  });

  setTimeout(() => {
    const canvas = qrcodeContainer.querySelector('canvas');
    if (canvas) {
      const imageUrl = canvas.toDataURL('image/png');
      downloadLink.href = imageUrl;
      downloadLink.download = 'qrcode.png';
      downloadLink.style.display = 'inline-block';
      copyLinkBtn.style.display = 'inline-block';
    }
  }, 100);
}

copyLinkBtn.addEventListener('click', () => {
  const text = textInput.value.trim();
  if (text) {
    navigator.clipboard.writeText(text).then(() => {
      const originalText = copyLinkBtn.textContent;
      copyLinkBtn.textContent = 'Скопировано!';
      setTimeout(() => {
        copyLinkBtn.textContent = originalText;
      }, 1500);
    });
  }
});

generateQR();
