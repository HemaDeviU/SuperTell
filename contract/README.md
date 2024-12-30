SuperTell contract facilitates a prediction market where users bet on whether the BTC/USD price will go up or down during a specified round. It includes treasury fee collection, round resolution, and support for user claims.
# SuperTell Contract Overview

## Constructor
### `constructor(address _oracleAddress)`
- **Description**: Initializes the contract.
- **Actions**:
  - Sets the `oracle` address for fetching BTC prices.
  - Assigns the contract deployer as the owner.
  - Starts the first prediction round.

---

## Internal Functions
### `_startNewRound()`
- **Description**: Starts a new prediction round.
- **Actions**:
  - Increments the `currentEpoch`.
  - Fetches the BTC price from the oracle.
  - Initializes a new `Round` struct with start and close times.
  - Emits the `RoundStarted` event.

### `_placeBet(bool isUp, address user, uint256 amount)`
- **Description**: Places a bet for the current round.
- **Actions**:
  - Validates the round's betting window and ensures the user hasn't already bet.
  - Updates the round's total "up" or "down" bet amounts.
  - Records the user's bet details.
  - Emits the `BetPlaced` event.
  - Resolves the previous round if it's eligible.

### `_shouldResolveRound(uint256 epoch)`
- **Description**: Checks if a round should be resolved.
- **Returns**: `true` if the round's close time and buffer period have passed, and it's unresolved.

### `_resolveRound(uint256 epoch)`
- **Description**: Resolves the specified round.
- **Actions**:
  - Fetches the close price from the oracle.
  - Marks the round as resolved.
  - Determines whether "up" or "down" bets won.
  - Emits the `RoundResolved` event.
  - Starts a new round if applicable.

---

## External/Public Functions
### `betUp(address user, uint256 amount)`
- **Description**: Places an "up" bet on the current round.
- **Actions**: Calls `_placeBet` with `isUp = true`.

### `betDown(address user, uint256 amount)`
- **Description**: Places a "down" bet on the current round.
- **Actions**: Calls `_placeBet` with `isUp = false`.

### `claim(uint256 epoch)`
- **Description**: Claims winnings for a specified round.
- **Requirements**:
  - The round must be resolved.
  - The user must have placed a bet and won.
- **Actions**:
  - Calculates the payout after deducting the treasury fee.
  - Transfers winnings to the user.
  - Updates the treasury balance.
  - Emits the `Claimed` event.

### `withdrawTreasury()`
- **Description**: Withdraws the treasury funds.
- **Requirements**:
  - Callable only by the owner.
- **Actions**:
  - Transfers the treasury amount to the owner.
  - Resets the treasury balance.
  - Emits the `TreasuryWithdrawn` event.

### `pause()`
- **Description**: Pauses the contract, disabling actions like betting and claiming.
- **Requirements**: Callable only by the owner.

### `unpause()`
- **Description**: Unpauses the contract, re-enabling paused actions.
- **Requirements**: Callable only by the owner.

---

## View/Getter Functions
### `getCurrentRound()`
- **Description**: Returns the details of the current prediction round.

### `getUserBet(uint256 epoch, address user)`
- **Description**: Returns the bet details for a specific user and epoch.

### `getCurrentEpoch()`
- **Description**: Returns the current epoch number.

### `getUserBetEpochs(address user)`
- **Description**: Returns a list of epochs in which the user placed bets.

---

## Miscellaneous
### `receive()`
- **Description**: Allows the contract to accept ETH directly.

---

## Events
- **`RoundStarted(uint256 indexed epoch, uint256 startTime)`**: Emitted when a new round starts.
- **`BetPlaced(uint256 indexed epoch, address indexed user, bool isUp, uint256 amount)`**: Emitted when a user places a bet.
- **`RoundResolved(uint256 indexed epoch, int256 closePrice, bool upWon)`**: Emitted when a round is resolved.
- **`Claimed(uint256 indexed epoch, address indexed user, uint256 amount)`**: Emitted when a user claims winnings.
- **`TreasuryWithdrawn(address indexed owner, uint256 amount)`**: Emitted when the treasury funds are withdrawn.

