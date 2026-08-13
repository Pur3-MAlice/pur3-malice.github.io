const scriptURL = 'https://script.google.com/macros/s/AKfycbxSJbrJoGoATx_2ARaUxIUvs64a-yOCwdCb4x90o2HqKF6deeXAqoXIPEr95A0_pS0b4g/exec'
let currentGroup = []
const searchForm = document.getElementById("guest-search")
const results = document.getElementById("guest-results")
const rsvpForm = document.getElementById("rsvp-form")


rsvpForm.addEventListener("submit", async e => {
    e.preventDefault()

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
})

searchForm.addEventListener("submit", async e => {
    e.preventDefault()

    const firstName = document.getElementById("searchFirstName").value
    const lastName = document.getElementById("searchLastName").value

    const response = await fetch(
    `${scriptURL}?first_name=${firstName}&last_name=${lastName}`
    )

    const group = await response.json()
    currentGroup = group
    results.innerHTML = ""
    rsvpForm.innerHTML = `<input type="hidden" name="sheet_name" value="rsvp_responses">`

    group.forEach((guest, index) => {
    const wrapper = document.createElement("div")

    wrapper.innerHTML = `
        <h3>${guest[1]} ${guest[2]}</h3>
    
        <div class="radio-options attendance">
            <label class="radio-box">
                <input type="radio" name="guest_${index}_attendance" value="yes">
                <span>Yes, I'll be there</span>
            </label>
            <label class="radio-box">
                <input type="radio" name="guest_${index}_attendance" value="no">
                <span>Sorry, I can't make it</span>
            </label>
        </div>

        

        <div class="meal-options" style="display:none">

        <div class="radio-options starter">
            <label class="radio-box">
                <input type="radio" name="guest_${index}_starter" value="salmon">
                <span>Salmon ceviche, dill creme fraiche, szechuan chilli oi, toasted sourdough</span>
            </label>
            <label class="radio-box">
                <input type="radio" name="guest_${index}_starter" value="aubergine">
                <span>Grilled aubergine, curried yogurt, pickled raisins, toasted pine nuts, crispy sage (ve, gf)</span>
            </label>
            <label class="radio-box">
                <input type="radio" name="guest_${index}_starter" value="pork">
                <span>Stick-miso pork belly skewers, soy and ginger dressed fennel and cabbage salad (gf)</span>
            </label>
        </div>


        <div class="radio-options main">
            <label class="radio-box">
                <input type="radio" name="guest_${index}_main" value="chicken">
                <span>Roasted chicken supreme, grilled corn, harissa and brown butter (gf)</span>
            </label>
            <label class="radio-box">
                <input type="radio" name="guest_${index}_main" value="beef">
                <span>Daube of beef, slow cooked in a red wine sauce, roasted carrots, chive (gf)</span>
            </label>
            <label class="radio-box">
                <input type="radio" name="guest_${index}_main" value="celeriac">
                <span>Celeriac 'steak', pickled celery, miso glaze (ve, gf)</span>
            </label>
        </div>

        <div class="radio-options dessert">
            <label class="radio-box">
                <input type="radio" name="guest_${index}_dessert" value="cheesecake">
                <span>Strawberry cheesecake, cherry and cardamom compote (v)</span>
            </label>
            <label class="radio-box">
                <input type="radio" name="guest_${index}_dessert" value="brownie">
                <span>Chocolate brownie, butterscotch and chocolate mascarpone (ve)</span>
            </label>
            <label class="radio-box">
                <input type="radio" name="guest_${index}_dessert" value="toffeepudding">
                <span>Sticky toffee pudding, roasted pineapple, toffee sauce (v)</span>
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
    const attendanceSelect = wrapper.querySelector(
        `[name="guest_${index}_attendance"]`
    )

    const mealSection = wrapper.querySelector(".meal-options")

    const starter = wrapper.querySelector(
        `[name="guest_${index}_starter"]`
    )

    const main = wrapper.querySelector(
        `[name="guest_${index}_main"]`
    )

    const dessert = wrapper.querySelector(
        `[name="guest_${index}_dessert"]`
    )

    attendanceSelect.addEventListener("change", () => {
        
        console.log(attendanceSelect)

        if (attendanceSelect.value === "yes") {

        mealSection.style.display = "block"

        starter.required = true
        main.required = true
        dessert.required = true

        } else {

        mealSection.style.display = "none"

        starter.required = false
        main.required = false
        dessert.required = false

        starter.value = ""
        main.value = ""
        dessert.value = ""

        }

    })
    })
    const submitButton = document.createElement("button")
    
    submitButton.type = "submit"
    submitButton.textContent = "Submit RSVP"

    rsvpForm.appendChild(submitButton)

})