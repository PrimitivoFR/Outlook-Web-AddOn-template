export function snackMessage(_this,message: String) {

    _this.snackbarService.add({
        msg: message,
        action: {
            text: null
        },
        timeout: 2000,

    });
}