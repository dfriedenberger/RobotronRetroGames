class Player {

    constructor(position) {
      this.position = position;
      this.jumpmode = undefined;
    }

    getPosition()
    {
        return this.position;
    }

    setPosition(position)
    {
        this.position = position;
    }

    getJumpMode()
    {
        return this.jumpmode;
    }

    setJumpMode(jumpmode)
    {
        this.jumpmode = jumpmode;
    }
}