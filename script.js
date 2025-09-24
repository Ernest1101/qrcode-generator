document.getElementById('generate').addEventListener('click', function () {
  const text = document.getElementById('text').value.trim();
  const qrcodeContainer = document.getElementById('qrcode');
  const downloadLink = document.getElementById('download');

  qrcodeContainer.innerHTML = '';
  downloadLink.style.display = 'none';

  if (!text) return;

  const qrcode = new QRCode(qrcodeContainer, {
    text: text,
    width: 200,
    height: 200,
    colorDark: '#000000',
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.H
  });

  setTimeout(() => {
    const canvas = qrcodeContainer.querySelector('canvas');
    if (canvas) {
      const imageUrl = canvas.toDataURL('image/png');
      downloadLink.href = imageUrl;
      downloadLink.download = 'qrcode.png';
      downloadLink.style.display = 'inline-block';
    }
  }, 100);
});
