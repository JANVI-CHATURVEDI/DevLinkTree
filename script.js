
const menu = document.getElementById("menu")
const plus = document.getElementById("plus")

plus.addEventListener("click", () => {

    // it would have worked with style.css  but not with tailwind    
    // if(menu.style.display == "none"){
    //     menu.style.display = "block"
    // }

    menu.classList.toggle("hidden");
})

// BACKGROUND COLOR

const bgDropdown = document.getElementById("bgDropdown")
const bgTrigger = document.getElementById("bgTrigger")

bgTrigger.addEventListener("click", () => {
    bgDropdown.classList.toggle("hidden");
})


const colorpicker = document.getElementById("colorPicker")
const customGradient = document.getElementById("customGradient")

const body = document.body

// solid color
colorpicker.addEventListener("input", (e) => {
    const selectedcolor = e.target.value
    body.style.background = selectedcolor
})

// gradient color
// Solid colors fill even a tiny area, but gradients need enough height to show the full transition — without min-h-screen, the body is too short for gradients to appear.
customGradient.addEventListener("change", (e) => {
    const selectedGradient = e.target.value.trim();
    body.style.background = selectedGradient


    if (!selectedGradient.includes("gradient")) {
        alert("Please enter a valid gradient like: linear-gradient(...)");
    }

});



//  BACKGROUND IMAGE

const bgimgDropdown = document.getElementById("bgimgDropdown")
const bgimgTrigger = document.getElementById("bgimgTrigger")

bgimgTrigger.addEventListener("click", () => {
    bgimgDropdown.classList.toggle("hidden");
})

const imageUpload = document.getElementById("imageUpload");

imageUpload.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (event) {
        document.body.style.backgroundImage = `url(${event.target.result})`;
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundPosition = "center";

        // ✅ Clear the input after setting
        imageUpload.value = "";
    };

    reader.readAsDataURL(file);
});










//  img
const imgTrigger = document.getElementById("imgTrigger");
const imgDropdown = document.getElementById("imgDropdown");

imgTrigger.addEventListener("click", () => {
    imgDropdown.classList.toggle("hidden");
});

const imageInput = document.getElementById("imageInput");
const canvas = document.getElementById("canvas");

imageInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const wrapper = document.createElement("div");
    wrapper.style.position = "absolute";
    wrapper.style.top = "20px";
    wrapper.style.left = "20px";
    wrapper.style.width = "200px";
    wrapper.style.height = "200px";
    wrapper.style.outline = "none";
    wrapper.style.resize = "both";
    wrapper.style.scrollbarWidth = "none";
    wrapper.style.msOverflowStyle = "none";
    wrapper.style.overflow = "visible"; // allow panel to overflow
    wrapper.style.border = "2px solid transparent";

    const img = document.createElement("img");
    img.src = URL.createObjectURL(file);
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.objectFit = "cover";

    wrapper.appendChild(img);
    canvas.appendChild(wrapper);
    makeDraggable(wrapper);

    // 🎛️ Panel Setup
    const stylePanel = document.createElement("div");
    stylePanel.style.position = "absolute";
    stylePanel.style.left = "0";
    stylePanel.style.top = "100%";
    stylePanel.style.marginTop = "8px";
    stylePanel.style.background = "#303841";
    stylePanel.style.border = "1px solid #999";
    stylePanel.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
    stylePanel.style.borderRadius = "10px";
    stylePanel.style.padding = "10px";
    stylePanel.style.display = "none";
    stylePanel.style.fontSize = "12px";
    stylePanel.style.minWidth = "160px";
    stylePanel.style.zIndex = "100";
    stylePanel.style.color = "#fff";

    const addLabeledControl = (labelText, control) => {
        const container = document.createElement("div");
        container.style.marginBottom = "8px";

        const label = document.createElement("label");
        label.innerText = labelText;
        label.style.display = "block";
        label.style.marginBottom = "4px";

        container.appendChild(label);
        container.appendChild(control);
        return container;
    };

    // 🎚️ Border Radius
    const radiusSlider = document.createElement("input");
    radiusSlider.type = "range";
    radiusSlider.min = "0";
    radiusSlider.max = "50";
    radiusSlider.value = "0";
    radiusSlider.style.width = "100%";

    radiusSlider.addEventListener("input", (e) => {
        const val = parseInt(e.target.value);
        if (val === 50) {
            const size = Math.min(wrapper.offsetWidth, wrapper.offsetHeight);
            wrapper.style.width = `${size}px`;
            wrapper.style.height = `${size}px`;
            wrapper.style.borderRadius = "50%";
            img.style.borderRadius = "50%";
        } else {
            wrapper.style.borderRadius = `${val}px`;
            img.style.borderRadius = `${val}px`;
        }
    });

    // 📏 Width
    const widthInput = document.createElement("input");
    widthInput.type = "number";
    widthInput.value = wrapper.offsetWidth;
    widthInput.style.width = "100%";
    widthInput.style.color = "black"; // 👈 black text inside input

    widthInput.addEventListener("input", () => {
        wrapper.style.width = `${widthInput.value}px`;
    });

    // 📐 Height
    const heightInput = document.createElement("input");
    heightInput.type = "number";
    heightInput.value = wrapper.offsetHeight;
    heightInput.style.width = "100%";
    heightInput.style.color = "black"; // 👈 black text inside input

    heightInput.addEventListener("input", () => {
        wrapper.style.height = `${heightInput.value}px`;
    });

    // 🌫️ Shadow toggle + intensity
    const shadowToggle = document.createElement("input");
    shadowToggle.type = "checkbox";

    const shadowSlider = document.createElement("input");
    shadowSlider.type = "range";
    shadowSlider.min = "0";
    shadowSlider.max = "100";
    shadowSlider.value = "30";
    shadowSlider.style.width = "100%";
    shadowSlider.style.display = "none";

    shadowToggle.addEventListener("change", () => {
        shadowSlider.style.display = shadowToggle.checked ? "block" : "none";
        wrapper.style.boxShadow = shadowToggle.checked
            ? `0 4px 12px rgba(0,0,0,${shadowSlider.value / 100})`
            : "none";
    });

    shadowSlider.addEventListener("input", () => {
        if (shadowToggle.checked) {
            wrapper.style.boxShadow = `0 4px 12px rgba(0,0,0,${shadowSlider.value / 100})`;
        }
    });

    // ❌ Delete
    const delBtn = document.createElement("button");
    delBtn.innerText = "Delete";
    delBtn.style.background = "#dc2626";
    delBtn.style.color = "#fff";
    delBtn.style.border = "none";
    delBtn.style.marginTop = "10px";
    delBtn.style.padding = "6px 10px";
    delBtn.style.borderRadius = "4px";
    delBtn.style.cursor = "pointer";

    delBtn.addEventListener("click", () => {
        wrapper.remove();
    });

    stylePanel.appendChild(addLabeledControl("Border Radius", radiusSlider));
    stylePanel.appendChild(addLabeledControl("Width", widthInput));
    stylePanel.appendChild(addLabeledControl("Height", heightInput));
    stylePanel.appendChild(addLabeledControl("Box Shadow", shadowToggle));
    stylePanel.appendChild(shadowSlider);
    stylePanel.appendChild(delBtn);

    wrapper.appendChild(stylePanel);

    // 🧠 Hover logic with sticky behavior
    let isHoveringWrapper = false;
    let isHoveringPanel = false;

    wrapper.addEventListener("mouseenter", () => {
        isHoveringWrapper = true;
        stylePanel.style.display = "block";
        wrapper.style.borderColor = "blue";
    });

    wrapper.addEventListener("mouseleave", () => {
        isHoveringWrapper = false;
        setTimeout(() => {
            if (!isHoveringPanel) {
                stylePanel.style.display = "none";
                wrapper.style.borderColor = "transparent";
            }
        }, 200);
    });

    stylePanel.addEventListener("mouseenter", () => {
        isHoveringPanel = true;
        stylePanel.style.display = "block";
        wrapper.style.borderColor = "blue";
    });

    stylePanel.addEventListener("mouseleave", () => {
        isHoveringPanel = false;
        setTimeout(() => {
            if (!isHoveringWrapper) {
                stylePanel.style.display = "none";
                wrapper.style.borderColor = "transparent";
            }
        }, 200);
    });
});



// Draggable logic of DOM elements
function makeDraggable(element) {
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    element.addEventListener("mousedown", (e) => {

        const tag = e.target.tagName.toLowerCase();
        if (["input", "button", "select", "label", "textarea"].includes(tag)) return;

        const panel = element.querySelector(".note-control-panel");
        if (panel && panel.contains(e.target)) return; // 🛑 don't drag if clicked inside panel

        // 🛑 Don't drag if it's a resize action (edge or corner) or delete
        const style = window.getComputedStyle(element);
        const isResizing =
            e.offsetX > element.clientWidth - 16 &&
            e.offsetY > element.clientHeight - 16;

        if (isResizing || e.target.classList.contains("delete-btn")) return;

        isDragging = true;
        offsetX = e.clientX - element.getBoundingClientRect().left;
        offsetY = e.clientY - element.getBoundingClientRect().top;
        element.style.zIndex = 10;
    });

    document.addEventListener("mousemove", (e) => {
        if (!isDragging) return;

        const x = e.clientX - offsetX;
        const y = e.clientY - offsetY;

        element.style.left = `${x}px`;
        element.style.top = `${y}px`;
    });

    document.addEventListener("mouseup", () => {
        isDragging = false;
    });
}










const noteTrigger = document.getElementById("noteTrigger");

noteTrigger.addEventListener("click", () => {
    const noteWrapper = document.createElement("div");
    noteWrapper.style.position = "absolute";
    noteWrapper.style.top = "100px";
    noteWrapper.style.left = "100px";
    noteWrapper.style.zIndex = "55";
    noteWrapper.style.display = "inline-block";

    // 📜 Note
    const note = document.createElement("div");
    note.style.width = "250px";
    note.style.minHeight = "150px";
    note.style.background = "#fff8b3";
    note.style.color = "#000";
    note.style.padding = "10px";
    note.style.borderRadius = "12px";
    note.style.boxShadow = "2px 4px 10px rgba(0,0,0,0.2)";
    note.style.resize = "both";
    note.style.overflow = "auto";
    note.style.fontSize = "16px";
    note.style.fontFamily = "Arial";
    note.style.outline = "none";
    note.style.border = "none";
    note.style.cursor = "move";
    note.contentEditable = "true";
    note.setAttribute("spellcheck", "false");

    // 🎛️ Panel
    const panel = document.createElement("div");
    panel.className = "note-control-panel";
    panel.style.display = "flex";
    panel.style.flexWrap = "wrap";
    panel.style.gap = "6px";
    panel.style.padding = "6px";
    panel.style.marginBottom = "8px";
    panel.style.borderRadius = "6px";
    panel.style.background = "rgba(0,0,0,0.7)";
    panel.style.display = "none";
    panel.style.color = "white";

    // === CONTROLS ===

    // Background color
    const bgLabel = document.createElement("label");
    bgLabel.innerText = "BG:";
    const bgColor = document.createElement("input");
    bgColor.type = "color";
    bgColor.title = "Change Note Background";
    bgColor.addEventListener("input", (e) => {
        note.style.background = e.target.value;
    });

    // Text color
    const textLabel = document.createElement("label");
    textLabel.innerText = "Text:";
    const textColor = document.createElement("input");
    textColor.type = "color";
    textColor.title = "Change Text Color";
    textColor.addEventListener("input", (e) => {
        note.style.color = e.target.value;
    });

    // Font size
    const sizeLabel = document.createElement("label");
    sizeLabel.innerText = "Size:";
    const fontSize = document.createElement("input");
    fontSize.type = "number";
    fontSize.min = "10";
    fontSize.max = "40";
    fontSize.value = "16";
    fontSize.title = "Change Text Size";
    fontSize.style.width = "50px";
    fontSize.style.background = "#fff";
    fontSize.style.color = "#000";
    fontSize.style.border = "none";
    fontSize.style.padding = "2px";
    fontSize.addEventListener("input", (e) => {
        note.style.fontSize = `${e.target.value}px`;
    });

    // Font family
    const fontLabel = document.createElement("label");
    fontLabel.innerText = "Font:";
    const fontSelect = document.createElement("select");
    fontSelect.style.background = "#fff";
    fontSelect.style.color = "#000";
    fontSelect.style.padding = "2px";
    fontSelect.style.border = "none";
    ["Arial", "Georgia", "Courier New", "Comic Sans MS"].forEach(f => {
        const option = document.createElement("option");
        option.value = f;
        option.textContent = f;
        fontSelect.appendChild(option);
    });
    fontSelect.addEventListener("change", (e) => {
        note.style.fontFamily = e.target.value;
    });

    // Shadow color
    const shadowColor = document.createElement("input");
    shadowColor.type = "color";
    shadowColor.title = "Shadow Color";
    shadowColor.value = "#000000";

    // Shadow blur range
    const shadowRange = document.createElement("input");
    shadowRange.type = "range";
    shadowRange.min = "0";
    shadowRange.max = "50";
    shadowRange.value = "10";
    shadowRange.title = "Shadow Intensity";

    // Shadow toggle
    const shadowBtn = document.createElement("button");
    shadowBtn.innerText = "Apply Shadow";
    shadowBtn.style.color = "white";
    shadowBtn.style.background = "#333";
    shadowBtn.style.border = "none";
    shadowBtn.style.padding = "4px";
    shadowBtn.style.cursor = "pointer";
    shadowBtn.title = "Apply Shadow";
    shadowBtn.addEventListener("click", () => {
        const color = shadowColor.value;
        const blur = shadowRange.value;
        note.style.boxShadow = `2px 4px ${blur}px ${color}`;
    });

    // Shadow Toggle Button
    const shadowToggle = document.createElement("button");
    shadowToggle.innerText = "Shadow: On";  // default is on
    shadowToggle.style.color = "white";
    shadowToggle.style.background = "#333";
    shadowToggle.style.border = "none";
    shadowToggle.style.padding = "4px 8px";
    shadowToggle.style.cursor = "pointer";
    shadowToggle.title = "Toggle Note Shadow";

    let shadowEnabled = true;  // initial state

    shadowToggle.addEventListener("click", () => {
        shadowEnabled = !shadowEnabled;

        if (shadowEnabled) {
            note.style.boxShadow = "2px 4px 10px rgba(0,0,0,0.2)";
            shadowToggle.innerText = "Shadow: On";
        } else {
            note.style.boxShadow = "none";
            shadowToggle.innerText = "Shadow: Off";
        }
    });


    // Delete
    const delBtn = document.createElement("button");
    delBtn.innerText = "Delete";
    delBtn.style.color = "white";
    delBtn.style.background = "#b91c1c";
    delBtn.style.border = "none";
    delBtn.style.padding = "4px";
    delBtn.style.cursor = "pointer";
    delBtn.title = "Delete Note";
    delBtn.addEventListener("click", () => {
        noteWrapper.remove();
    });

    // Append with labels
    panel.appendChild(bgLabel);
    panel.appendChild(bgColor);
    panel.appendChild(textLabel);
    panel.appendChild(textColor);
    panel.appendChild(sizeLabel);
    panel.appendChild(fontSize);
    panel.appendChild(fontLabel);
    panel.appendChild(fontSelect);
    panel.appendChild(document.createTextNode("Shadow:"));
    panel.appendChild(shadowColor);
    panel.appendChild(shadowRange);
    panel.appendChild(shadowBtn);
    panel.appendChild(shadowToggle)
    panel.appendChild(delBtn);

    // 👀 Show panel only when hovering wrapper
    noteWrapper.addEventListener("mouseenter", () => {
        panel.style.display = "flex";
    });
    noteWrapper.addEventListener("mouseleave", () => {
        panel.style.display = "none";
    });

    // Final assemble
    noteWrapper.appendChild(panel);
    noteWrapper.appendChild(note);
    canvas.appendChild(noteWrapper);
    makeDraggable(noteWrapper);
});











const addSocialBtn = document.getElementById("addSocialBtn");

addSocialBtn.addEventListener("click", () => {
    const link = prompt("Enter social link (e.g. https://twitter.com/janvi1010)");
    if (!link) return;

    const urlObj = new URL(link);
    const domain = urlObj.hostname;
    const username = urlObj.pathname.replace(/^\/+/, "");

    // Wrapper block
    const wrapper = document.createElement("div");
    wrapper.style.position = "absolute";
    wrapper.style.top = "100px";
    wrapper.style.left = "100px";
    wrapper.style.width = "180px";
    wrapper.style.border = "2px solid transparent";
    wrapper.style.borderRadius = "16px";
    wrapper.style.overflow = "visible";
    wrapper.style.resize = "both";

    makeDraggable(wrapper);
    canvas.appendChild(wrapper);

    // Social Card
    const card = document.createElement("div");
    card.style.background = "#f9fafb";
    card.style.border = "1px solid #e5e7eb";
    card.style.borderRadius = "16px";
    card.style.padding = "14px";
    card.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.1)";
    card.style.display = "flex";
    card.style.flexDirection = "column";
    card.style.alignItems = "center";
    card.style.fontFamily = "sans-serif";
    card.style.gap = "6px";
    card.style.width = "100%";
    card.style.height = "100%";

    const favicon = document.createElement("img");
    favicon.src = `https://www.google.com/s2/favicons?sz=64&domain=${domain}`;
    favicon.style.width = "32px";
    favicon.style.height = "32px";

    const title = document.createElement("div");
    title.innerText = domain.replace("www.", "");
    title.style.fontWeight = "bold";
    title.style.fontSize = "14px";
    title.style.color = "#111827";

    const uname = document.createElement("div");
    uname.innerText = username ? "@" + username : "";
    uname.style.fontSize = "12px";
    uname.style.color = "#4b5563";

    const follow = document.createElement("a");
    follow.innerText = "Follow";
    follow.href = link;
    follow.target = "_blank";
    follow.style.background = "#3b82f6";
    follow.style.color = "#fff";
    follow.style.fontSize = "12px";
    follow.style.padding = "4px 10px";
    follow.style.borderRadius = "6px";
    follow.style.textDecoration = "none";
    follow.style.fontWeight = "500";

    card.appendChild(favicon);
    card.appendChild(title);
    card.appendChild(uname);
    card.appendChild(follow);
    wrapper.appendChild(card);

    // 🧩 Styling Panel (Same as image panel)
    const stylePanel = document.createElement("div");
    stylePanel.style.position = "absolute";
    stylePanel.style.top = "100%";   // ✅ Place just below the card
    stylePanel.style.left = "0";
    stylePanel.style.background = "#303841";
    stylePanel.style.border = "1px solid #999";
    stylePanel.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
    stylePanel.style.borderRadius = "10px";
    stylePanel.style.padding = "10px";
    stylePanel.style.display = "none";
    stylePanel.style.fontSize = "12px";
    stylePanel.style.minWidth = "160px";
    stylePanel.style.zIndex = "100";
    stylePanel.style.color = "#fff";

    const addLabeledControl = (labelText, control) => {
        const container = document.createElement("div");
        container.style.marginBottom = "8px";

        const label = document.createElement("label");
        label.innerText = labelText;
        label.style.display = "block";
        label.style.marginBottom = "4px";
        label.style.color = "#fff";

        container.appendChild(label);
        container.appendChild(control);
        return container;
    };



    // 🎚️ Border Radius
    const radiusSlider = document.createElement("input");
    radiusSlider.type = "range";
    radiusSlider.min = "0";
    radiusSlider.max = "50";
    radiusSlider.value = "0";
    radiusSlider.style.width = "100%";

    radiusSlider.addEventListener("input", (e) => {
        const val = parseInt(e.target.value);

        if (val === 50) {
            // Make perfect circle
            const size = Math.min(wrapper.offsetWidth, wrapper.offsetHeight);
            wrapper.style.width = `${size}px`;
            wrapper.style.height = `${size}px`;
            wrapper.style.borderRadius = "50%";
            card.style.borderRadius = "50%";

            // Make card fit inside cleanly
            card.style.width = "100%";
            card.style.height = "100%";
            card.style.padding = "10px"; // reduce padding for round shape
            card.style.display = "flex";
            card.style.flexDirection = "column";
            card.style.justifyContent = "center";
            card.style.alignItems = "center";
            card.style.textAlign = "center";
            card.style.overflow = "hidden";
        } else {
            // Reset back to normal
            wrapper.style.borderRadius = `${val}px`;
            card.style.borderRadius = `${val}px`;
            card.style.width = "100%";
            card.style.height = "100%";
            card.style.padding = "14px";
            card.style.overflow = "visible";
        }
    });


    // Background color
    const bgLabel = document.createElement("label");
    bgLabel.innerText = "BG:";
    const bgColor = document.createElement("input");
    bgColor.type = "color";
    bgColor.title = "Change Note Background";
    bgColor.addEventListener("input", (e) => {
        card.style.background = e.target.value;
    });

    // 🧩 Title Editor Panel
    const titleEdit = document.createElement("input");
    titleEdit.type = "text";
    titleEdit.value = title.innerText;
    titleEdit.style.width = "100%";
    titleEdit.style.color = "black";
    titleEdit.addEventListener("input", () => {
        title.innerText = titleEdit.value;
    });

    // 🎨 Title color
    const titleColorLabel = document.createElement("label");
    titleColorLabel.innerText = "Title Color:";
    titleColorLabel.style.color = "#fff";
    const titleColor = document.createElement("input");
    titleColor.type = "color";
    titleColor.addEventListener("input", (e) => {
        title.style.color = e.target.value;
    });

    const titleFontSize = document.createElement("input");
    titleFontSize.type = "range";
    titleFontSize.min = "10";
    titleFontSize.max = "36";
    titleFontSize.value = "14"; // same as title default size
    titleFontSize.style.width = "100%";

    titleFontSize.addEventListener("input", (e) => {
        title.style.fontSize = `${e.target.value}px`;
    });



    // 🧩 Username Editor Panel
    const unameEdit = document.createElement("input");
    unameEdit.type = "text";
    unameEdit.value = uname.innerText;
    unameEdit.style.width = "100%";
    unameEdit.style.color = "black";
    unameEdit.addEventListener("input", () => {
        uname.innerText = unameEdit.value;
    });

    // 🎨 Username color
    const unameColorLabel = document.createElement("label");
    unameColorLabel.innerText = "Username Color:";
    unameColorLabel.style.color = "#fff";
    const unameColor = document.createElement("input");
    unameColor.type = "color";
    unameColor.addEventListener("input", (e) => {
        uname.style.color = e.target.value;
    });

    const unameFontSize = document.createElement("input");
    unameFontSize.type = "range";
    unameFontSize.min = "10";
    unameFontSize.max = "30";
    unameFontSize.value = "12"; // same as uname default size
    unameFontSize.style.width = "100%";

    unameFontSize.addEventListener("input", (e) => {
        uname.style.fontSize = `${e.target.value}px`;
    });


    const widthInput = document.createElement("input");
    widthInput.type = "number";
    widthInput.value = wrapper.offsetWidth;
    widthInput.style.width = "100%";
    widthInput.style.color = "black";
    widthInput.addEventListener("input", () => {
        wrapper.style.width = `${widthInput.value}px`;
    });

    const heightInput = document.createElement("input");
    heightInput.type = "number";
    heightInput.value = wrapper.offsetHeight;
    heightInput.style.width = "100%";
    heightInput.style.color = "black";
    heightInput.addEventListener("input", () => {
        wrapper.style.height = `${heightInput.value}px`;
    });

    const shadowToggle = document.createElement("input");
    shadowToggle.type = "checkbox";

    const shadowSlider = document.createElement("input");
    shadowSlider.type = "range";
    shadowSlider.min = "0";
    shadowSlider.max = "100";
    shadowSlider.value = "30";
    shadowSlider.style.width = "100%";
    shadowSlider.style.display = "none";

    shadowToggle.addEventListener("change", () => {
        shadowSlider.style.display = shadowToggle.checked ? "block" : "none";
        card.style.boxShadow = shadowToggle.checked
            ? `0 4px 12px rgba(0,0,0,${shadowSlider.value / 100})`
            : "none";
    });

    shadowSlider.addEventListener("input", () => {
        if (shadowToggle.checked) {
            card.style.boxShadow = `0 4px 12px rgba(0,0,0,${shadowSlider.value / 100})`;
        }
    });




    const delBtn = document.createElement("button");
    delBtn.innerText = "Delete";
    delBtn.style.background = "#dc2626";
    delBtn.style.color = "#fff";
    delBtn.style.border = "none";
    delBtn.style.marginTop = "10px";
    delBtn.style.padding = "6px 10px";
    delBtn.style.borderRadius = "4px";
    delBtn.style.cursor = "pointer";

    delBtn.addEventListener("click", () => {
        wrapper.remove();
        stylePanel.remove();
    });

    stylePanel.appendChild(addLabeledControl("Background Color", bgColor));

    stylePanel.appendChild(addLabeledControl("Title", titleEdit));
    stylePanel.appendChild(titleColorLabel);
    stylePanel.appendChild(titleColor);

    stylePanel.appendChild(addLabeledControl("Username", unameEdit));
    stylePanel.appendChild(unameColorLabel);
    stylePanel.appendChild(unameColor);
    stylePanel.appendChild(addLabeledControl("Title Font Size", titleFontSize));
    stylePanel.appendChild(addLabeledControl("Username Font Size", unameFontSize));


    stylePanel.appendChild(addLabeledControl("Border Radius", radiusSlider));
    stylePanel.appendChild(addLabeledControl("Width", widthInput));
    stylePanel.appendChild(addLabeledControl("Height", heightInput));
    stylePanel.appendChild(addLabeledControl("Box Shadow", shadowToggle));
    stylePanel.appendChild(shadowSlider);
    stylePanel.appendChild(delBtn);
    wrapper.appendChild(stylePanel);

    // Always allow panel to overflow from wrapper
    wrapper.style.overflow = "visible";

    // Show panel when mouse enters either wrapper or panel
    function showPanel() {
        wrapper.style.borderColor = "blue";
        stylePanel.style.display = "block";
    }

    // Hide only if mouse leaves both wrapper and panel
    function hidePanel(e) {
        if (
            !wrapper.contains(e.relatedTarget) &&
            !stylePanel.contains(e.relatedTarget)
        ) {
            wrapper.style.borderColor = "transparent";
            stylePanel.style.display = "none";
        }
    }

    wrapper.addEventListener("mouseenter", showPanel);
    wrapper.addEventListener("mouseleave", hidePanel);
    stylePanel.addEventListener("mouseenter", showPanel);
    stylePanel.addEventListener("mouseleave", hidePanel);

});
