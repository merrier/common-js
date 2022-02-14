/*
 DOM相关
*/

/**
 * [showDomOutline description] 显示全部DOM边框
 * @return {null}
 */
function showDomOutline(arr) {
    [].forEach.call($$("*"), dom => {
        dom.style.outline = "1px solid #" + (~~(Math.random() * (1 << 24))).toString(16);
    });
}