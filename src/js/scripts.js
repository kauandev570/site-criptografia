function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.innerText = message;
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.left = '50%';
    notification.style.transform = 'translateX(-50%)';
    notification.style.padding = '10px 20px';
    notification.style.backgroundColor = type === 'success' ? '#00FFAB' : '#FF6347';
    notification.style.color = '#0D0D0D';
    notification.style.borderRadius = '5px';
    notification.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.3)';
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 2000);
}

// Função para criptografar usando AES
function encryptAES() {
    const message = document.getElementById('message').value;
    const passphrase = document.getElementById('encryptionKey').value;

    if (message === '' || passphrase === '') {
        showNotification('Digite uma mensagem e uma chave secreta!', 'error');
        return;
    }

    const encrypted = CryptoJS.AES.encrypt(message, passphrase).toString();
    document.getElementById('encryptedMessage').value = encrypted;
    showNotification('Mensagem criptografada com sucesso usando AES!', 'success');
}

// Função para descriptografar usando AES
function decryptAES() {
    const encryptedMessage = document.getElementById('encryptedInput').value;
    const passphrase = document.getElementById('decryptionKey').value;

    if (encryptedMessage === '' || passphrase === '') {
        showNotification('Digite uma mensagem criptografada e uma chave secreta!', 'error');
        return;
    }

    try {
        const decrypted = CryptoJS.AES.decrypt(encryptedMessage, passphrase);
        const originalMessage = decrypted.toString(CryptoJS.enc.Utf8);

        if (originalMessage === '') {
            showNotification('Falha na descriptografia. Verifique a chave secreta.', 'error');
        } else {
            document.getElementById('decryptedMessage').value = originalMessage;
            showNotification('Mensagem descriptografada com sucesso usando AES!', 'success');
        }
    } catch (error) {
        showNotification('Erro na descriptografia. Verifique a chave secreta.', 'error');
    }
}

// Função para copiar texto para a área de transferência
function copyToClipboard(elementId) {
    const textArea = document.getElementById(elementId);
    textArea.select();
    document.execCommand('copy'); // Comando para copiar o texto selecionado

    showNotification('Texto copiado para a área de transferência!', 'success'); // Notificação de sucesso
}
