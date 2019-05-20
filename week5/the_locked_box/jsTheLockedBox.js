const box = {
    locked: true,
    unlock() { this.locked = false; },
    lock() { this.locked = true; },
    _content: [],
    get content() {
        if (this.locked) throw new Error("Locked!");
        return this._content;
    }
};

function withBoxUnlocked(body) {
    let lockStatus = box.locked;

    try {
        // Unlock the box
        if (lockStatus) {
            box.locked = !box.locked;
        }

        // Run the function
        body();
    } catch (e) {
        // Propagate the error
        throw e;
    } finally {
        // Lock the box if initially locked
        if (lockStatus) {
            box.locked = !box.locked;
        }
    }
}

function testWithBoxUnlocked() {
    // Test #1
    withBoxUnlocked(function() {
        box.content.push("Gold Piece");
        console.log("Added gold piece");
    });

    // Test #2
    try {
        withBoxUnlocked(function() {
            throw new Error("Pirates on the horizon!  Abort!");
        });
    } catch (e) {
        console.log("Error raised:", e);
    }

    console.log(box.locked);
}