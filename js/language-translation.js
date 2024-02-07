var jQueryScript = document.createElement('script');  
jQueryScript.setAttribute('src','https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js');
document.head.appendChild(jQueryScript);

//TODO: FIX CLOUD/GET API KEY TO ACCESS THE TRANSLATION API.
function initializeTranslationAPI() {
    // Initialize Google Cloud Translation API client
    const translate = new google.translate.TranslateService();
    // Your translation logic goes here...
}

document.addEventListener('DOMContentLoaded', initializeTranslationAPI, function () {   
    
    // Initialize Google Cloud Translation API client
    const translate = new google.translate.TranslateService();

    // Function to translate text content
    function translateTextContent(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            let text = node.textContent.trim();
            // Translate text content using the Google Cloud Translation API
            translate.translateText({
                text: text,
                sourceLanguageCode: 'en', // Source language (English)
                targetLanguageCode: 'fr' // Target language (French)
            }).then(translation => {
                node.textContent = translation.translatedText;
            }).catch(error => {
                console.error('Error translating text:', error);
            });
        }
    }

    // Function to check the text content of each element and translate to French
    function checkTextContent(node) {
        if (node.nodeType === Node.ELEMENT_NODE) {
            // Translate text content of the current node
            translateTextContent(node);
            // Iterate through child nodes
            node.childNodes.forEach(checkTextContent);
        }
    }

    // Call the function starting from the document body
    checkTextContent(document.body);

    // Button click event listener to toggle between languages
    const translateButton = document.getElementById('translateButton');
    translateButton.addEventListener('click', function() {
        // Re-translate all text content with the current language
        checkTextContent(document.body);
    });
});

