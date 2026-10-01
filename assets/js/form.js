const scriptURL = 'https://script.google.com/macros/s/AKfycbxSJbrJoGoATx_2ARaUxIUvs64a-yOCwdCb4x90o2HqKF6deeXAqoXIPEr95A0_pS0b4g/exec'

let currentGroup = []

const searchForm = document.getElementById("guest-search")
const results = document.getElementById("guest-results")
const rsvpForm = document.getElementById("rsvp-form")
const loadingOverlay = document.getElementById("loading-overlay")
const loadingMessage = document.getElementById("loading-message")

function showLoading(message) {
    loadingMessage.textContent = message
    loadingOverlay.classList.add("is-active")
    loadingOverlay.setAttribute("aria-hidden", "false")
}

function hideLoading() {
    loadingOverlay.classList.remove("is-active")
    loadingOverlay.setAttribute("aria-hidden", "true")
}

function initNavigation() {

    const navEl = document.querySelector('.nav')
    const hamburgerEl = document.querySelector('.hamburger')
    const navItemEls = document.querySelectorAll('.nav-item')

    hamburgerEl.addEventListener('click', () => {

        console.log("Hamburger clicked")

        navEl.classList.toggle('nav--open')
        hamburgerEl.classList.toggle('hamburger--open')

    })

    navItemEls.forEach(navItemEl => {

        navItemEl.addEventListener('click', () => {

            navEl.classList.remove('nav--open')
            hamburgerEl.classList.remove('hamburger--open')

        })

    })

}


rsvpForm.addEventListener("submit", async e => {

    e.preventDefault()
    showLoading("Submitting your RSVP...")

    for (let i = 0; i < currentGroup.length; i++) {

        const guestData = {

            sheet_name: "rsvp_responses",

            firstName: currentGroup[i][1],
            lastName: currentGroup[i][2],

            attendance: document.querySelector(
                `[name="guest_${i}_attendance"]:checked`
            )?.value,

            starter: document.querySelector(
                `[name="guest_${i}_starter"]:checked`
            )?.value || "",

            main: document.querySelector(
                `[name="guest_${i}_main"]:checked`
            )?.value || "",

            dessert: document.querySelector(
                `[name="guest_${i}_dessert"]:checked`
            )?.value || "",

            dietary: document.querySelector(
                `[name="guest_${i}_dietary"]`
            ).value

        }

        const response = await fetch(scriptURL, {
            method: "POST",
            body: new URLSearchParams(guestData)
        })

        const result = await response.json()

        console.log(`Submitted ${guestData.firstName}:`, result)

    }
    window.location.href = "thank-you.html"
    hideLoading()

})


searchForm.addEventListener("submit", async e => {

    e.preventDefault()
    showLoading("Searching for your name...")

    const firstName = document.getElementById("searchFirstName").value
    const lastName = document.getElementById("searchLastName").value

    const response = await fetch(
        `${scriptURL}?first_name=${firstName}&last_name=${lastName}`
    )

    const group = await response.json()

    currentGroup = group

    results.innerHTML = ""

    rsvpForm.innerHTML = `
        <input 
            type="hidden" 
            name="sheet_name" 
            value="rsvp_responses"
        >
    `


    group.forEach((guest, index) => {

        const wrapper = document.createElement("div")

        wrapper.innerHTML = `

            <h3>${guest[1]} ${guest[2]}</h3>

            <div class="radio-options attendance">

                <label class="radio-box">

                    <input 
                        type="radio" 
                        name="guest_${index}_attendance" 
                        value="yes"
                    >

                    <span>
                        <p>Yes, I'll be there</p>
                    </span>

                </label>


                <label class="radio-box">

                    <input 
                        type="radio" 
                        name="guest_${index}_attendance" 
                        value="no"
                    >

                    <span>
                        <p>Sorry, I can't make it</p>
                    </span>

                </label>

            </div>


            <div class="meal-options" style="display:none">

                <div class="radio-options starter">

                    <h4>Starter</h4>

                    <label class="radio-box">

                        <input 
                            type="radio" 
                            name="guest_${index}_starter" 
                            value="salmon"
                        >

                        <span>
                            <p>
                                Salmon ceviche, dill creme fraiche,
                                szechuan chilli oi, toasted sourdough
                            </p>
                        </span>

                    </label>


                    <label class="radio-box">

                        <input 
                            type="radio" 
                            name="guest_${index}_starter" 
                            value="aubergine"
                        >

                        <span>
                            <p>
                                Grilled aubergine, curried yogurt,
                                pickled raisins, toasted pine nuts,
                                crispy sage (ve, gf)
                            </p>
                        </span>

                    </label>


                    <label class="radio-box">

                        <input 
                            type="radio" 
                            name="guest_${index}_starter" 
                            value="pork"
                        >

                        <span>
                            <p>
                                Stick-miso pork belly skewers,
                                soy and ginger dressed fennel and
                                cabbage salad (gf)
                            </p>
                        </span>

                    </label>

                </div>


                <div class="radio-options main">

                    <h4>Main Course</h4>

                    <label class="radio-box">

                        <input 
                            type="radio" 
                            name="guest_${index}_main" 
                            value="chicken"
                        >

                        <span>
                            <p>
                                Roasted chicken supreme, grilled corn,
                                harissa and brown butter (gf)
                            </p>
                        </span>

                    </label>


                    <label class="radio-box">

                        <input 
                            type="radio" 
                            name="guest_${index}_main" 
                            value="beef"
                        >

                        <span>
                            <p>
                                Daube of beef, slow cooked in a red wine sauce,
                                roasted carrots, chive (gf)
                            </p>
                        </span>

                    </label>


                    <label class="radio-box">

                        <input 
                            type="radio" 
                            name="guest_${index}_main" 
                            value="celeriac"
                        >

                        <span>
                            <p>
                                Celeriac 'steak', pickled celery,
                                miso glaze (ve, gf)
                            </p>
                        </span>

                    </label>

                </div>


                <div class="radio-options dessert">

                    <h4>Dessert</h4>

                    <label class="radio-box">

                        <input 
                            type="radio" 
                            name="guest_${index}_dessert" 
                            value="cheesecake"
                        >

                        <span>
                            <p>
                                Strawberry cheesecake,
                                cherry and cardamom compote (v)
                            </p>
                        </span>

                    </label>


                    <label class="radio-box">

                        <input 
                            type="radio" 
                            name="guest_${index}_dessert" 
                            value="brownie"
                        >

                        <span>
                            <p>
                                Chocolate brownie, butterscotch and
                                chocolate mascarpone (ve)
                            </p>
                        </span>

                    </label>


                    <label class="radio-box">

                        <input 
                            type="radio" 
                            name="guest_${index}_dessert" 
                            value="toffeepudding"
                        >

                        <span>
                            <p>
                                Sticky toffee pudding, roasted pineapple,
                                toffee sauce (v)
                            </p>
                        </span>

                    </label>

                </div>


                <input
                    type="text"
                    name="guest_${index}_dietary"
                    placeholder="Dietary requirements (optional)"
                >

            </div>
        `


        rsvpForm.appendChild(wrapper)


        /*
         * Get this guest's meal section.
         */
        const mealSection = wrapper.querySelector(".meal-options")


        /*
         * Get ALL meal radio buttons belonging to this guest.
         *
         * querySelector() would only return the first option.
         * querySelectorAll() returns the complete group.
         */
        const mealOptions = wrapper.querySelectorAll(
            `.meal-options input[type="radio"]`
        )


        /*
         * Listen on the guest wrapper rather than on a single
         * attendance radio button.
         *
         * The change event bubbles from whichever radio button
         * was actually selected.
         */
        wrapper.addEventListener("change", e => {

            /*
             * Ignore changes to starter, main and dessert.
             * We only want this handler to respond to attendance.
             */
            if (
                !e.target.matches(
                    `[name="guest_${index}_attendance"]`
                )
            ) {
                return
            }


            console.log(
                `${guest[1]} attendance changed:`,
                e.target.value
            )


            /*
             * Determine whether this guest is attending.
             */
            const attending = e.target.value === "yes"


            /*
             * Show or hide the complete meal section.
             */
            mealSection.style.display = attending
                ? "block"
                : "none"


            /*
             * Make all meal choices required when attending.
             *
             * If the guest is not attending:
             * - remove required
             * - clear any existing selections
             */
            mealOptions.forEach(option => {

                option.required = attending

                if (!attending) {
                    option.checked = false
                }

            })

        })

    })


    /*
     * Create the submit button after all guests have
     * been added to the form.
     */
    const submitButton = document.createElement("button")

    submitButton.type = "submit"
    submitButton.textContent = "Submit RSVP"

    rsvpForm.appendChild(submitButton)
    hideLoading()
})