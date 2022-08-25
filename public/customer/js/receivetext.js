var TextReceiver = (function () {
    var receivers;

    function onReceive(recvPayload, recvObj) {
        recvObj.content = Quiet.mergeab(recvObj.content, recvPayload);
        const id = Quiet.ab2str(recvObj.content);
        console.log(id);
        if (id.split("-")[0] === "S") {
            const link = urls["SANDBOX"] + id.split("-")[1];
            console.log(link);
            window.location.href = link;
        } else {
            const link = urls["PRODUCTION"] + id.split("-")[1];
            console.log(link);
            window.location.href = link;
        }

        recvObj.successes++;
        var total = recvObj.failures + recvObj.successes;
        var ratio = (recvObj.failures / total) * 100;
        recvObj.warningbox.textContent =
            "You may need to move the transmitter closer to the receiver and set the volume to 50% from onReceive. Packet Loss: " +
            recvObj.failures +
            "/" +
            total +
            " (" +
            ratio.toFixed(0) +
            "%)";
    }

    function onReceiverCreateFail(reason, recvObj) {
        console.log("failed to create quiet receiver: " + reason);
        recvObj.warningbox.classList.remove("d-none");
        recvObj.warningbox.textContent =
            "Sorry, it looks like this example is not supported by your browser. Please give permission to use the microphone or try again in Google Chrome or Microsoft Edge.";
    }

    function onReceiveFail(num_fails, recvObj) {
        recvObj.warningbox.classList.remove("d-none");
        recvObj.failures = num_fails;
        var total = recvObj.failures + recvObj.successes;
        var ratio = (recvObj.failures / total) * 100;
        recvObj.warningbox.textContent =
            "You may need to move the transmitter closer to the receiver and set the volume to 50%. Packet Loss: " +
            recvObj.failures +
            "/" +
            total +
            " (" +
            ratio.toFixed(0) +
            "%)";
    }

    function onClick(e, recvObj) {
        e.target.disabled = true;
        var originalText = e.target.innerText;
        e.target.innerText = e.target.getAttribute("data-quiet-receiving-text");
        e.target.setAttribute("data-quiet-receiving-text", originalText);

        var receiverOnReceive = function (payload) {
            onReceive(payload, recvObj);
        };
        var receiverOnReceiverCreateFail = function (reason) {
            onReceiverCreateFail(reason, recvObj);
        };
        var receiverOnReceiveFail = function (num_fails) {
            onReceiveFail(num_fails, recvObj);
        };
        Quiet.receiver({
            profile: recvObj.profilename,
            onReceive: receiverOnReceive,
            onCreateFail: receiverOnReceiverCreateFail,
            onReceiveFail: receiverOnReceiveFail,
        });
    }

    function setupReceiver(receiver) {
        var recvObj = {
            profilename: receiver.getAttribute("data-quiet-profile-name"),
            btn: receiver.querySelector("[data-quiet-receive-text-button]"),
            warningbox: receiver.querySelector(
                "[data-quiet-receive-text-warning]"
            ),
            successes: 0,
            failures: 0,
            content: new ArrayBuffer(0),
        };
        var onBtnClick = function (e) {
            return onClick(e, recvObj);
        };
        recvObj.btn.addEventListener("click", onBtnClick, false);
    }

    function onQuietReady() {
        for (var i = 0; i < receivers.length; i++) {
            setupReceiver(receivers[i]);
        }
    }

    function onQuietFail(reason) {
        console.log("quiet failed to initialize: " + reason);
        var warningbox = document.querySelector(
            "[data-quiet-receive-text-warning]"
        );
        warningbox.classList.remove("d-none");
        warningbox.textContent =
            "Sorry, it looks like there was a problem with this example (" +
            reason +
            ")";
    }

    function onDOMLoad() {
        receivers = document.querySelectorAll("[data-quiet-receive-text]");
        Quiet.addReadyCallback(onQuietReady, onQuietFail);
    }

    document.addEventListener("DOMContentLoaded", onDOMLoad);
})();
