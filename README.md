# assert-git-remote-ref-action

Github action to assert that HEAD of current branch is at same commit as the latest of the specific remote ref.

## Usage

```
    - name: Assert Git Remote Ref
      uses: Brightspace/assert-git-remote-ref-action@master
      with:
        remote: origin
        ref: main
```
