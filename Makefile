# Convert po file to json.
# NOTE: Install po2json and jed in advance.
po2json:
	po2json languages/guten-bubble-ja.po languages/guten-bubble-ja-block-guten-bubble.json -f jed1.x

# Copies plugin code files to build folder.
# NOTE: Build SCSS and Minify JavaScript in advance.
copyCodeToBuild:
	cp -rf ./css ./build/
	cp -rf ./js ./build/
	cp -f ./*.php ./build/
	cp -rf ./languages ./build/
	cp -rf ./img ./build/

# Copies readme.txt and screenshot files to build folder.
copyDocToBuild:
	cp -f ./readme.txt ./build/
	cp -f ./screenshot-*.png ./build/

# Clears wordpress folder.
cleanTestWP:
	rm -rf docker/wp

# Clears build folders.
cleanBuild:
	rm -rf build/*

# Copies plugin code files to trunk folder of svn.
# NOTE: Build SCSS and Minify JavaScript in advance.
copyCodeToTrunk:
	cp -rf ./css ./svn/guten-bubble/trunk/
	cp -rf ./js ./svn/guten-bubble/trunk/
	cp -f ./*.php ./svn/guten-bubble/trunk/
	cp -rf ./languages ./svn/guten-bubble/trunk/
	cp -rf ./img ./svn/guten-bubble/trunk/

# Copies readme.txt and screenshot files to trunk folder of svn.
copyDocToTrunk:
	cp -f ./readme.txt ./svn/guten-bubble/trunk/
	cp -f ./screenshot-*.png ./svn/guten-bubble/trunk/

# Clears trunk folder of svn.
cleanTrunk:
	rm -rf ./svn/guten-bubble/trunk/*
