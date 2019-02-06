let driverId = 0;
let passengerId = 0;
let tripId = 0;
let store = {
    drivers: [],
    trips: [],
    passengers: []
};
class Driver {
    constructor(name) {
        this.name = name;
        this.id = ++ driverId;
        
        store.drivers.push(this);
    }

    trips() {
        return store.trips.filter(
            function(trip) {
                return trip.driverId === this.id;
            }.bind(this)
        );
    }

    passengers() {
        return store.passengers.filter(
            function(passenger) {
                //this needs to be evaluate to true:
                this.trips().find(
                    function(trip) {
                        trip.passengerId === passenger.id
                    }
                );
            }.bind(this)
        );
    }
}

class Passenger {
    constructor(name) {
        this.name = name;
        this.id = ++passengerId;

        store.passengers.push(this);
    }

    trips() {
        return store.trips.filter(
            function(trip) {
                return trip.passengerId === this.id;
            }.bind(this)
        );
    }

    drivers() {
        return this.trips().filter(
            function(trip) {
                return trip.driver();
            }.bind(this)
        );
    }
}

class Trip {
    constructor(driver, passenger) {
        this.id = ++tripId;

        if(driver) {
            this.driverId = driver.id;
        }
        if(passenger) {
            this.passengerId = passenger.id;
        }

        store.trips.push(this);
    }

    driver() {
        return store.drivers.find(
            function(driver) {
                return driver.id === this.driverId
            }.bind(this)
        );
    }

    passenger() {
        return store.passengers.find(
            function(passenger) {
                return passenger.id === this.passengerId
            }.bind(this)
        );
    }
}