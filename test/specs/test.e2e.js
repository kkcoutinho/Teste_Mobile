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

    it('Deve fazer Login', async () => {
        const username = await $("accessibility id:Username input field");
        await username.addValue("bob@example.com");

        const password = await $("accessibility id:Password input field");
        await password.addValue("10203040");

        const botaologin = await $("accessibility id:Login button");
        await botaologin.click();

    });

    it('Deve preencher formulário de Checkout', async () => {
        const fullname = await $("accessibility id:Full Name* input field");
        await fullname.addValue("Bob da Silva");
        const adress = await $("accessibility id:Address Line 1* input field");
        await adress.addValue("Avenida Paes de Barros 1000");
        const adressdois = await $("accessibility id:Address Line 2 input field");
        await adressdois.addValue("Mooca");
        const cidade = await $("accessibility id:City* input field");
        await cidade.addValue("São Paulo");
        const estado = await $("accessibility id:State/Region input field");
        await estado.addValue("SP");

        await driver.action('pointer')
            .move({ duration: 0, x: 737, y: 1260 })
            .down({ button: 0 })
            .move({ duration: 1000, x: 748, y: 548 })
            .up({ button: 0 })
            .perform();

        const cep = await driver.$("accessibility id:Zip Code* input field");
        await cep.addValue("03030050");
        const pais = await driver.$("accessibility id:Country* input field");
        await pais.addValue("Brasil");
        const pagar = await driver.$("xpath://android.view.ViewGroup[@content-desc=\"To Payment button\"]");
        await pagar.click();
    });

    it('Deve preencher formulário de pagamento e finalizar compra', async () => {
        const full = await $("accessibility id:Full Name* input field");
        await full.addValue("Bob da Silva");
        const cardnumber = await $("accessibility id:Card Number* input field");
        await cardnumber.addValue("325812657568789");
        const date = await $("accessibility id:Expiration Date* input field");
        await date.addValue("03/26");
        const code = await $("accessibility id:Security Code* input field");
        await code.addValue("123");
        const orderbutton = await $("xpath://android.view.ViewGroup[@content-desc=\"Review Order button\"]");
        await orderbutton.click();

        const productmochila = await $("accessibility id:product label");
        await expect(productmochila).toHaveText("Sauce Labs Backpack");
        const pricemochila = await $("accessibility id:product price");
        await expect(pricemochila).toHaveText("$29.99");
        const placeorderbutton = await $("accessibility id:Place Order button");
        await placeorderbutton.click();
        const msgcomplete = await $("-android uiautomator:new UiSelector().text(\"Checkout Complete\")");
        await expect(msgcomplete).toHaveText("Checkout Complete");
        const msgthankyou = await $("xpath://android.widget.TextView[@text=\"Thank you for your order\"]");
        await expect(msgthankyou).toHaveText("Thank you for your order");
    });
});
