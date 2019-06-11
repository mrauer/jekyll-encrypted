function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Get the content
var content = document.getElementById('encrypted_content').innerHTML;
content = content.replace("<p>", "").replace("</p>", "");
set_btn_visibility(content);

// Set the button(s) visibility
function set_btn_visibility(content) {
    num_spaces = content.split(' ').length;
    if (num_spaces == 1) {
        document.getElementById('encrypted_block').style.display = 'block';
    } else {
        document.getElementById('decrypted_block').style.display = 'block';
    }
}

// Passphrase
var passphrase = getCookie('passphrase');
cryptkey = CryptoJS.enc.Utf8.parse(passphrase);

// Decryption
var decrypt = CryptoJS.AES.decrypt(content, cryptkey, {
    iv: CryptoJS.enc.Hex.parse('00000000000000000000000000000000'),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
});

// Encryption
var encrypted = CryptoJS.AES.encrypt(content, cryptkey, {
    iv: CryptoJS.enc.Hex.parse('00000000000000000000000000000000'),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
});

// Copy to clipboard
function CopyToClipboard(containerid) {
    if (document.selection) {
        var range = document.body.createTextRange();
        range.moveToElementText(document.getElementById(containerid));
        range.select().createTextRange();
        document.execCommand("copy");

    } else if (window.getSelection) {
        var range = document.createRange();
        range.selectNode(document.getElementById(containerid));
        window.getSelection().addRange(range);
        document.execCommand("copy");
        alert("Copied to Clipboard")
    }
}
