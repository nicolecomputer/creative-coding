function movableDirections(friend, world) {
  let available = [];

  if (friend.x > friend.size) {
    available.push("LEFT");
  }

  if (friend.x < world.width - friend.size) {
    available.push("RIGHT");
  }

  if (friend.y > friend.size) {
    available.push("UP");
  }

  if (friend.y < world.height - friend.size) {
    available.push("DOWN");
  }

  return available;
}

function move(state, nextDirection) {
  if (nextDirection === "LEFT") {
    state.friend.x -= 6;
  } else if (nextDirection === "RIGHT") {
    state.friend.x += 6;
  } else if (nextDirection === "UP") {
    state.friend.y -= 6;
  } else if (nextDirection === "DOWN") {
    state.friend.y += 6;
  }
}

function moveRandomly(state) {
  const canMove = movableDirections(state.friend, state.world);
  const choice = floor(random(0, canMove.length));
  const nextDirection = canMove[choice];

  move(state, nextDirection);
}

function seek(state) {
  const { friend, candy } = state;

  const distanceX = friend.x - candy.x;
  const distanceY = friend.y - candy.y;

  if (abs(distanceX) > abs(distanceY)) {
    if (distanceX > 0) {
      move(state, "LEFT");
    } else {
      move(state, "RIGHT");
    }
  } else {
    if (distanceY > 0) {
      move(state, "UP");
    } else {
      move(state, "DOWN");
    }
  }
}

let globalState = {
  time: 0,
  world: {
    width: 400,
    height: 400,
  },
  friend: {
    x: 300,
    y: 200,
    size: 12,
    slowness: 6,
    // energy
    // state: explore, seek, sleep
    state: "SEEK",
    awake: true,
  },
  candy: {
    x: 10,
    y: 10,
  },
};

function setup() {
  createCanvas(400, 400);
  noCursor();
}

// Update Functions
function updateFriend() {
  globalState.time += 1;

  const { friend, time } = globalState;

  // if (!friend.awake) {
  //   return;
  // }

  // if (time > 700) {
  //   globalState.friend.awake = false;
  // }

  // globalState.friend.slowness = Math.floor(time / 100) + 3;

  globalState.candy.x = mouseX;
  globalState.candy.y = mouseY;

  if (globalState.time % friend.slowness === 0) {
    if (friend.state === "SEEK") {
      const move = random(1);
      // 80% chance to seek
      if (move > 0.4) {
        seek(globalState);
      } else {
        moveRandomly(globalState);
      }
    }
  }
}

// Drawing Functions

function drawFriend(state) {
  const { friend } = state;

  let fillColor = color("#06D6A0");
  if (!friend.awake) {
    fillColor = color("#047D5D");
  }

  fill(fillColor);
  noStroke();

  circle(friend.x, friend.y, friend.size);
}

function drawFriendStatus(state) {
  const { friend } = state;

  fill("#06BA8A");
  let status = `Friend is ${friend.state}`;

  if (!friend.awake) {
    fill("#047D5D");
    status = "Friend is taking a nap";
  }

  text(status, 8, 390);
}

function drawCandy(state) {
  const { candy } = state;

  fill("#EF476F");
  circle(candy.x, candy.y, 10);
}

function draw() {
  background("#F8FFE5");
  drawFriendStatus(globalState);

  drawCandy(globalState);
  drawFriend(globalState);

  updateFriend();
}
