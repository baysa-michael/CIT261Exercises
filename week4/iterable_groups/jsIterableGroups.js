class Group {
    constructor() {
        this.group = [];
    }

    add(item) {
        if (!this.group.includes(item)) {
            this.group.push(item);
        }
    }

    delete(item) {
        if (this.group.includes(item)) {
            this.group = this.group.filter((target) => { return target !== item; });
        }
    }

    has(item) {
        for (let target of this.group) {
            if (target === item) {
                return true;
            }
        }

        return false;
    }

    groupSize() {
        return this.group.length;
    }

    get(position) {
        return this.group[position];
    }

    static from(iterableObject) {
        let returnGroup = new Group();
        for (let item of iterableObject) {
            returnGroup.add(item);
        }

        return returnGroup;
    }

    toString() {
        let output = "Contents:";
        for (let thisItem of this.group) {
            output += "\nItem:  " + thisItem;
        }

        return output;
    }

    [Symbol.iterator]() {
        return new GroupIterator(this);
    }
}

class GroupIterator {
    constructor(group) {
        this.position = 0;
        this.group = group;
    }

    next() {
        let completed = false;
        let value = {
            position: this.position,
            value: this.group.get(this.position),
        };

        if (this.position >= this.group.groupSize()) {
            completed = true;
        } else {
            this.position++;
        }

        return {value, done: completed };
    }
}

function testIterableGroup() {
    // Create a new test group
    let pizzaGroup = new Group();
    console.log("Creating Pizza Group:");
    console.log(pizzaGroup.toString());

    // Add elements to the group
    pizzaGroup.add("Pizza");
    pizzaGroup.add("Peppers");
    pizzaGroup.add("Mushrooms");
    pizzaGroup.add("Mushrooms");
    pizzaGroup.add("sauce");
    pizzaGroup.add("Sauce");
    console.log("Testing Added Items:");
    console.log(pizzaGroup.toString());

    // Delete an element from the group
    pizzaGroup.delete("Pizza");
    pizzaGroup.delete("sauce");
    console.log("Testing Deleted Items:");
    console.log(pizzaGroup.toString());

    // Create a group from an array
    let cheeses = [
        "Cheddar",
        "Gouda",
        "Parmesan",
        "Edam",
        "Gruyere",
        "Edam",
        "Cheddar"
    ];

    let cheeseGroup = Group.from(cheeses);
    console.log("Creating Pizza Group:");
    console.log(cheeseGroup.toString());

    // Test the has function
    console.log("Does this array have Gouda?:  " + cheeseGroup.has("Gouda"));
    console.log("Does this array have Roquefort?:  " + cheeseGroup.has("Roquefort"));

    // Test the iterator function
    console.log("Cheese List:");
    for (let target of cheeseGroup) {
        console.log("Position:  " + target.position + " - Cheese:  " + target. value);
    }
}