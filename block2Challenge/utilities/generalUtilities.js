class GeneralUtilities {
    static convertUnixTimeToJavascript(unixTime) {
        return new Date(unixTime * 1000);
    }
}

export default GeneralUtilities;