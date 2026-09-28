const medicineName =
    document.getElementById("medicineName");

const dosage =
    document.getElementById("dosage");

const medicineTime =
    document.getElementById("medicineTime");

const period =
    document.getElementById("period");

const addButton =
    document.getElementById("addButton");

const reminderList =
    document.getElementById("reminderList");

const total =
    document.getElementById("total");

const taken =
    document.getElementById("taken");

const pending =
    document.getElementById("pending");

const resetButton =
    document.getElementById("resetButton");

const message =
    document.getElementById("message");


let reminders =
    JSON.parse(localStorage.getItem("reminders")) || [];


// Add Reminder

addButton.addEventListener("click", () => {

    const name =
        medicineName.value.trim();

    const dose =
        dosage.value.trim();

    const time =
        medicineTime.value;


    if (name === "" || dose === "" || time === "") {

        message.textContent =
            "⚠️ Please fill all fields.";

        return;
    }


    const reminder = {

        id: Date.now(),

        name: name,

        dosage: dose,

        time: time,

        period: period.value,

        taken: false

    };


    reminders.push(reminder);

    saveData();

    displayReminders();

    clearForm();

    message.textContent =
        "✅ Reminder added successfully.";

});


// Display reminders

function displayReminders() {

    reminderList.innerHTML = "";


    if (reminders.length === 0) {

        reminderList.innerHTML =
            "<p>No reminders added yet.</p>";

        updateStats();

        return;
    }


    reminders.forEach(reminder => {

        const card =
            document.createElement("div");

        card.className = "reminder-card";


        const status =
            reminder.taken
            ? "✅ Taken"
            : "⏳ Pending";


        card.innerHTML = `

            <h2>💊 ${reminder.name}</h2>

            <p>
                <strong>Dosage:</strong>
                ${reminder.dosage}
            </p>

            <p>
                <strong>Time:</strong>
                ${formatTime(reminder.time)}
            </p>

            <p>
                <strong>Period:</strong>
                ${reminder.period}
            </p>

            <p class="status">
                Status: ${status}
            </p>

            <div class="actions">

                ${
                    reminder.taken
                    ? ""
                    : `
                    <button
                        class="taken-btn"
                        onclick="markTaken(${reminder.id})">
                        ✅ Mark Taken
                    </button>
                    `
                }

                <button
                    class="delete-btn"
                    onclick="deleteReminder(${reminder.id})">
                    🗑️ Delete
                </button>

            </div>
        `;


        reminderList.appendChild(card);

    });


    updateStats();

}


// Mark as Taken

function markTaken(id) {

    const reminder =
        reminders.find(
            item => item.id === id
        );


    if (reminder) {

        reminder.taken = true;

        saveData();

        displayReminders();

        message.textContent =
            "✅ Medicine marked as taken.";

    }

}


// Delete reminder

function deleteReminder(id) {

    reminders =
        reminders.filter(
            item => item.id !== id
        );


    saveData();

    displayReminders();

    message.textContent =
        "🗑️ Reminder deleted.";

}


// Update statistics

function updateStats() {

    const totalCount =
        reminders.length;


    const takenCount =
        reminders.filter(
            item => item.taken
        ).length;


    const pendingCount =
        totalCount - takenCount;


    total.textContent =
        totalCount;

    taken.textContent =
        takenCount;

    pending.textContent =
        pendingCount;

}


// Save data

function saveData() {

    localStorage.setItem(
        "reminders",
        JSON.stringify(reminders)
    );

}


// Clear form

function clearForm() {

    medicineName.value = "";

    dosage.value = "";

    medicineTime.value = "";

    period.value = "Morning";

}


// Format time

function formatTime(time) {

    const [hours, minutes] =
        time.split(":");

    let hour = parseInt(hours);

    const ampm =
        hour >= 12 ? "PM" : "AM";

    hour =
        hour % 12 || 12;

    return `${hour}:${minutes} ${ampm}`;

}


// Reset all

resetButton.addEventListener("click", () => {

    reminders = [];

    saveData();

    displayReminders();

    message.textContent =
        "🔄 All reminders have been reset.";

});


// Initial display

displayReminders();
