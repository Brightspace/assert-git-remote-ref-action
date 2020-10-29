# assert-git-remote-ref-action

Github action to assert the current branch is at the latest remote ref.

## Usage

```
    - name: Assert Git Remote Ref
      uses: Brightspace/assert-git-remote-ref-action@master
      with:
        remote: origin
        ref: main
```
