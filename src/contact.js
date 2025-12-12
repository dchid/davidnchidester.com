$(document).ready(function () {

    $("#contactForm").on("submit", async function (e) {
        e.preventDefault();

        const alertContainer = $("#alert-container");
        alertContainer.empty();

        const payload = {
            name: $("#name").val().trim(),
            email: $("#email").val().trim(),
            subject: $("#subject").val().trim(),
            message: $("#message").val().trim()
        };

        try {
	    const gatewayURL = "https://6ui8zdlxwk.execute-api.us-west-1.amazonaws.com/prod/contact"; 
            const response = await fetch(gatewayURL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (response.ok) {
                alertContainer.html(
                    `<div class="alert alert-success">Your message has been sent successfully.</div>`
                );
                $("#contactForm")[0].reset();
            } else {
                alertContainer.html(
                    `<div class="alert alert-danger">Error: ${result.message || "Unable to send message."}</div>`
                );
            }

        } catch (err) {
            alertContainer.html(
                `<div class="alert alert-danger">Unexpected error: ${err.message}</div>`
            );
        }
    });

});

