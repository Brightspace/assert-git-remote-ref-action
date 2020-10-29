# assert-git-remote-ref-action

Github action to assert that HEAD of current branch is at the same commit as specified remote ref.

## Usage

```
    - name: Assert Git Remote Ref
      uses: Brightspace/assert-git-remote-ref-action@master
      with:
        remote: origin
        ref: main
```
