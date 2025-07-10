const testLocators = {
    idLocators: {},
    classLocators: {
        checkoutInfo: '.checkout_info',
        products: {
            img: '.inventory_item_img img',
            addToCartBtn: '.btn_inventory',
            price: '.pricebar'
        }
    },
    xPathLocators: {
        addToCart: '//button[text()="Add to cart"]',
        imgClass: '(//img[@class="inventory_item_img"])[1]',
        // //*[@id="username"]
        // //*[contains(text(),"Welcome")]
    },
    dataTestIdLocators: {
        username: 'username',
        password: 'password',
        error: 'error',

        inventoryItem: 'inventory-item',
        products: {
            title: 'inventory-item-name',
            desc: 'inventory-item-desc',
            price: 'inventory-item-price',
        },

        cartItem: {
            addToCart: 'add-to-cart-sauce-labs-backpack', 
            removeFromCart: 'remove-sauce-labs-backpack',
            inCartItem: 'inventory-item',
        },

        // review
        addToCart: '[data-test^="add-to-cart-"]',
        removeFromCart: '[data-test^="remove-"]',

        cartBadge: 'shopping-cart-badge',
        cartLink: 'shopping-cart-link',

        sort: 'product-sort-container',
        backToProducts: 'back-to-products',
        checkout: 'checkout',
        finish: 'finish',
        checkoutComplete: 'title',
        
        checkoutInfo: {
            firstName: 'firstName',
            lastName: 'lastName',
            zip: 'postalCode'
        }
    },
    titleLocators: {},
    labelLocators: {},
    txtLocators: {
        selectOrganizationHeading: 'Swag Labs',
        loginPage: 'Swag LabsLoginAccepted',
        logInBtnTxt: 'Login',
        invalidCreds: 'Epic sadface: Username and password do not match any user in this service',
        lockedOut: 'Epic sadface: Sorry, this user has been locked out.',
        missingUsername: 'Epic sadface: Username is required',
        missingPassword: 'Epic sadface: Password is required',
        addToCart: 'Add to cart',
        cartItemName: 'Sauce Labs Backpack',
        checkout: 'Checkout',
        continue: 'Continue',
        finish: 'Finish',
        checkoutComplete: 'Checkout: Complete!'
    },
    altTxtLocators: {},
    placeholderLocators: {},
    url: {},
    roleLocators: {},
    optionLocators: {
        sort: {
            lowToHigh: 'lohi',
            highToLow: 'hilo',
            aToZ: 'az',
            zToA: 'za'
        }
    },
    regExLocators: {},
}

export default testLocators