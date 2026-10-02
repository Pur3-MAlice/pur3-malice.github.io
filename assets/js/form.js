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
    if (!currentGroup.length || !rsvpForm.reportValidity()) {
        return
    }
    showLoading("Submitting your RSVP...")

    for (let i = 0; i < currentGroup.length; i++) {
        const guestData = {
            sheet_name: "rsvp_responses",

            firstName: currentGroup[i][1],
            lastName: currentGroup[i][2],

            attendance: document.querySelector(
                `[name="guest_${i}_attendance"]:checked`
            )?.value,

            starter: rsvpForm.querySelector(
                `[name="guest_${i}_starter"]`
            )?.value || "",

            main: rsvpForm.querySelector(
                `[name="guest_${i}_main"]`
            )?.value || "",

            dessert: rsvpForm.querySelector(
                `[name="guest_${i}_dessert"]`
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
    const firstNameInput = document.getElementById("searchFirstName")
    const lastNameInput = document.getElementById("searchLastName")
    firstNameInput.value = firstNameInput.value.trim()
    lastNameInput.value = lastNameInput.value.trim()
    if (!searchForm.reportValidity()) {
        return
    }
    showLoading("Checking the guest list...")

    const firstName = firstNameInput.value
    const lastName = lastNameInput.value
    // const response = await fetch(
    //     `${scriptURL}?first_name=${firstName}&last_name=${lastName}`
    // )
    try {
        const response = await fetch(
            `${scriptURL}?first_name=${encodeURIComponent(firstName)}&last_name=${encodeURIComponent(lastName)}`
        )
        if (!response.ok) {
            throw new Error(`Request failed: ${response.status}`)
        }
        const group = await response.json()
        console.log("Guest group found:", group)

    // Start your validation here
    if (!Array.isArray(group)) {
        throw new Error("Invalid RSVP response")
    }

    if (group.length === 0) {
        throw new Error("No RSVP found")
    }

    // More validation goes here...

    currentGroup = group

    results.innerHTML = ""
    rsvpForm.innerHTML = `<input type="hidden" name="sheet_name" value="rsvp_responses">`
    group.forEach((guest, index) => {
        const wrapper = document.createElement("div")
        wrapper.innerHTML = `
            <h3>${guest[1]}</h3>
            <div class="radio-options attendance">
                <label class="radio-box">
                    <input type="radio" name="guest_${index}_attendance" value="yes" required>
                    <span><p>Yes, I'll be there</p></span>
                </label>
                <label class="radio-box">
                    <input type="radio" name="guest_${index}_attendance" value="no" required>
                    <span><p>Sorry, I can't make it</p></span>
                </label>
            </div>

            <div class="meal-options" style="display:none">
                <div class="meal-choice starter">
                    <h4>Starter</h4>
                    <select name="guest_${index}_starter" aria-label="Starter">
                        <option value="" disabled selected>Select a starter</option>
                        <option value="salmon">Salmon ceviche, dill creme fraiche, szechuan chilli oi, toasted sourdough</option>
                        <option value="aubergine">Grilled aubergine, curried yogurt, pickled raisins, toasted pine nuts, crispy sage (ve, gf)</option>
                        <option value="pork">Stick-miso pork belly skewers, soy and ginger dressed fennel and cabbage salad (gf)</option>
                    </select>
                </div>

                <div class="meal-choice main-course">
                    <h4>Main</h4>
                    <select name="guest_${index}_main" aria-label="Main course">
                        <option value="" disabled selected>Select a main course</option>
                        <option value="chicken">Roasted chicken supreme, grilled corn, harissa and brown butter (gf)</option>
                        <option value="beef">Daube of beef, slow cooked in a red wine sauce, roasted carrots, chive (gf)</option>
                        <option value="celeriac">Celeriac 'steak', pickled celery, miso glaze (ve, gf)</option>
                    </select>
                </div>

                <div class="meal-choice dessert">
                    <h4>Dessert</h4>
                    <select name="guest_${index}_dessert" aria-label="Dessert">
                        <option value="" disabled selected>Select a dessert</option>
                        <option value="cheesecake">Strawberry cheesecake, cherry and cardamom compote (v)</option>
                        <option value="brownie">Chocolate brownie, butterscotch and chocolate mascarpone (ve)</option>
                        <option value="toffeepudding">Sticky toffee pudding, roasted pineapple, toffee sauce (v)</option>
                    </select>
                </div>
                <span class="text-input"><input type="text" name="guest_${index}_dietary" placeholder="Let us know about any dietary requirements (optional)"></span>
            </div>
        `
        rsvpForm.appendChild(wrapper)

        const mealSection = wrapper.querySelector(".meal-options")
        const mealSelects = wrapper.querySelectorAll(".meal-options select")
        wrapper.addEventListener("change", e => {
            if (
                !e.target.matches(
                    `[name="guest_${index}_attendance"]`
                )
            ) {
                return
            }
            console.log(`${guest[1]} attendance changed:`, e.target.value)
            const attending = e.target.value === "yes"
            mealSection.style.display = attending
                ? "block"
                : "none"

            mealSelects.forEach(select => {
                select.required = attending
                if (!attending) {
                    select.value = ""
                }
            })
        })
    })
    const submitButton = document.createElement("button")

    submitButton.type = "submit"
    submitButton.textContent = "Submit RSVP"

    rsvpForm.appendChild(submitButton)

} catch (error) {

    console.error("RSVP lookup failed:", error)
    hideLoading()
    results.innerHTML = ""
    rsvpForm.innerHTML = `<div class="rsvp-error"><h3>We couldn't find your RSVP information. <br>Check your details and try again.</h3></div>`

} finally {

    hideLoading()

}
})