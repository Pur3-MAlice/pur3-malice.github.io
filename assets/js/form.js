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
        `[name="guest_${i}_attendance"]`
        ).value,

        starter: document.querySelector(
        `[name="guest_${i}_starter"]`
        ).value,

        main: document.querySelector(
        `[name="guest_${i}_main"]`
        ).value,

        dessert: document.querySelector(
        `[name="guest_${i}_dessert"]`
        ).value,

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
    
        <label>Attendance</label>
        <select required name="guest_${index}_attendance">
        <option value="">Select attendance</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
        </select>

        <div class="meal-options" style="display:none">

        <label>Starter</label>
        <select required name="guest_${index}_starter">
        <option value="">Select starter</option>
        <option value="starter_1">Starter 1</option>
        <option value="starter_2">Starter 2</option>
        </select>

        <label>Main</label>
        <select required name="guest_${index}_main">
        <option value="">Select main</option>
        <option value="main_1">Main 1</option>
        <option value="main_2">Main 2</option>
        </select>

        <label>Dessert</label>
        <select required name="guest_${index}_dessert">
        <option value="">Select dessert</option>
        <option value="dessert_1">Dessert 1</option>
        <option value="dessert_2">Dessert 2</option>
        </select>

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