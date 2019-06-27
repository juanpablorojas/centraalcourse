function func() {
    this.name = 'juan';
    const obj = {
        getName: function() {
            return this.name;
        }
    };
    console.log(obj.getName());
}
new func();