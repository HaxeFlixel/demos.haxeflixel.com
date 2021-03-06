import haxe.io.Path;
import sys.FileSystem;
import sys.io.File;

using StringTools;

enum abstract Target(String) from String {
	var Flash = "flash";
	var Html5 = "html5";
}

class Script {
	static function main() {
		var args = Sys.args();
		var target = args[0];
		var flixelDemos = args[1];

		build(target);
		copy(target, flixelDemos);
	}

	static function build(target:Target) {
		var args = ["run", "flixel-tools", "buildprojects", Std.string(target)];
		if (target == Html5) {
			args = args.concat(["--", "-final"]);
		}
		runCommand("haxelib", args);
	}

	static function copy(target:Target, flixelDemos:String) {
		FileSystem.createDirectory("bin");

		var dir = "bin/" + (if (target == Flash) "swf" else "html5");
		runCommand("rm", ["-rf", dir]);
		runCommand("mkdir", [dir]);

		for (category in FileSystem.readDirectory(flixelDemos)) {
			var categoryFullPath = Path.join([flixelDemos, category]);
			if (!FileSystem.isDirectory(categoryFullPath) || category.startsWith("."))
				continue;

			for (demo in FileSystem.readDirectory(categoryFullPath)) {
				var demoFullPath = Path.join([categoryFullPath, demo]);
				switch (target) {
					case Flash:
						var swfPath = Path.join([demoFullPath, 'export/flash/bin/$demo.swf']);
						if (FileSystem.exists(swfPath))
							File.copy(swfPath, '$dir/$demo.swf');
					case Html5:
						var html5Path = Path.join([demoFullPath, 'export/html5/bin']);
						if (FileSystem.exists(html5Path))
							runCommand("cp", ["-r", html5Path, '$dir/$demo']);
				}
			}
		}
	}

	static function runCommand(cmd:String, args:Array<String>):Int {
		Sys.println(cmd + " " + args.join(" "));
		return Sys.command(cmd, args);
	}
}
