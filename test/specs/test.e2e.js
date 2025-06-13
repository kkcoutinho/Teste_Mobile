import { expect, $ } from '@wdio/globals';

describe('Fluxo de compra MyDemoAPP', () => {
    it('Deve selecionar mochila na cor vermelha e proceder para o checkout', async () => {

        const products = await $("xpath://android.widget.TextView[@text=\"Products\"]");
        await expect(products).toHaveText("Products");

        const mochila = await $("-android uiautomator:new UiSelector().className(\"android.widget.ImageView\").instance(4)");
        await mochila.click();

        const produtomochila = await $("-android uiautomator:new UiSelector().text(\"Sauce Labs Backpack\")");
        await expect(produtomochila).toHaveText("Sauce Labs Backpack");

        const precomochila = await $("accessibility id:product price");
        await expect(precomochila).toHaveText("$29.99");

        const cor = await $("xpath://android.view.ViewGroup[@content-desc=\"red circle\"]/android.view.ViewGroup");
        await cor.click();

        await driver.action('pointer')
            .move({ duration: 0, x: 545, y: 1253 })
            .down({ button: 0 })
            .move({ duration: 1000, x: 549, y: 523 })
            .up({ button: 0 })
            .perform();
        const addcart = await $("accessibility id:Add To Cart button");
        await addcart.click();

        const cart = await $("xpath://android.view.ViewGroup[@content-desc=\"cart badge\"]/android.widget.ImageView");
        await cart.click();

        const mycart = await $("xpath://android.widget.TextView[@text=\"My Cart\"]");
        await expect(mycart).toHaveText("My Cart");

        const checkout = await $("xpath://android.widget.TextView[@text=\"Proceed To Checkout\"]");
        await checkout.click();
    });
});
