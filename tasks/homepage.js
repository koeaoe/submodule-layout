module.exports = function(grunt){
    
    var _ = grunt.util._;
    
    grunt.registerTask("homepage", "generates a home page html file", function(target){

        var context, source, targetConfig, template;
        
        target = target || "dist";
        
        template = grunt.config.get(this.name + ".template");
        targetConfig = grunt.config.get(this.name + "." + target);
        source = grunt.file.read(template);
        context = _(grunt.config.get()).extend(targetConfig.context); 
        
        grunt.file.write(targetConfig.dest, _(source).template(context));
        
        grunt.log.writeln("Homepage HTML written '"  + targetConfig.dest + "'");
    });
    
};