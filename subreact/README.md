# React App in GitHub Pages Subpage
A little bit hacky, since GitHub pages using Jekyll does not understand the clientside routes defined, we have to use `HashRouter`.

The deploy.yml code is also fun. 
1. Builds the React app, 
2. Deletes the source code
3. Moves the files out of build (for GH pages routing reasons)
4. Deletes empty build file 

```yml
- name: Build React App
working-directory: subreact
run: |
    npm install
    npm run build
    shopt -s extglob
    rm -rf !(build)
    mv build/* ./
    rm -rf build
```