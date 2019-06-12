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
